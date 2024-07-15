import { qk } from "@api/query-keys";
import { Question, TQuestion, updateQuestions } from "@api/questions";
import { IconDraggableDots, IconPlus, IconTrashBin } from "@app/assets/icons";
import { Button } from "@app/ui/button";
import { Select } from "@app/ui/select";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import {
  Box,
  Divider,
  FormControlLabel,
  IconButton,
  Switch,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recordToOptions } from "@utils/options";
import { quizQuestionTypesOptions } from "@utils/questions";
import { useCallback } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerController } from "./answer-controller";

const AddQuestionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Divider
      sx={{
        my: 1,
        cursor: "pointer",
        ":hover&.MuiDivider-root": {
          "&::before": {
            borderTopColor: "success.main",
          },
          "&::after": {
            borderTopColor: "success.main",
          },
        },
        ":hover .icon-plus": {
          color: "success.main",
        },
      }}
      onClick={onClick}
    >
      <IconPlus className="icon-plus" />
    </Divider>
  );
};

const AddQuestionsFormSchema = z.object({
  questions: z.array(TQuestion),
});

export type AddQuestionsFormValues = z.infer<typeof AddQuestionsFormSchema>;

const emptyQuestion: Question = {
  question: "",
  type: "RADIO",
  order: 0,
  isRequired: false,
  answers: [],
  dropdownAnswers: {
    answer: "",
    options: [],
  },
};

type Props = {
  quizId: string;
  questionsId: string;
  defaultQuestions: Array<Question>;
};

export const AddQuestionForm = ({
  quizId,
  questionsId,
  defaultQuestions,
}: Props) => {
  const queryClient = useQueryClient();
  const { control, watch, setValue, handleSubmit } =
    useForm<AddQuestionsFormValues>({
      defaultValues: {
        questions:
          defaultQuestions.length > 0 ? defaultQuestions : [emptyQuestion],
      },
      resolver: zodResolver(AddQuestionsFormSchema),
    });

  const { fields, insert, remove, swap } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      swap(result.source.index, result.destination.index);
    },
    [swap]
  );

  const $updateQuestions = useMutation({
    mutationFn: updateQuestions,
  });

  return (
    <Box display="flex" justifyContent="center" overflow="auto">
      <Box
        component="form"
        onSubmit={handleSubmit((values) => {
          $updateQuestions.mutate(
            { quizId, questionsId, ...values },
            {
              onSuccess: (question) => {
                queryClient.invalidateQueries({
                  queryKey: qk.quiz.quizQuestion.toKeyWithArgs({
                    questionsId: question._id,
                  }),
                });
              },
            }
          );
        })}
        sx={{ width: 1, maxWidth: 800 }}
      >
        <AddQuestionButton
          onClick={() => {
            insert(0, emptyQuestion);
          }}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {fields.map((field, index) => {
                  return (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Box
                            bgcolor="white"
                            p={3}
                            borderRadius={2}
                            position="relative"
                            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
                          >
                            <Box
                              sx={{
                                width: 1,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                display: "flex",
                                justifyContent: "center",
                                ":hover .draggable-dots": {
                                  color: "text.disabled",
                                },
                              }}
                              {...provided.dragHandleProps}
                            >
                              <IconDraggableDots
                                className="draggable-dots"
                                sx={{ color: "divider" }}
                              />
                            </Box>
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                              }}
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              <IconTrashBin sx={{ color: "error.light" }} />
                            </IconButton>
                            <Box
                              my={3}
                              display="flex"
                              alignItems="flex-start"
                              gap={3}
                            >
                              <Controller
                                control={control}
                                name={`questions.${index}.question`}
                                render={({ field, fieldState: { error } }) => (
                                  <TextField
                                    {...field}
                                    {...getFieldError(error)}
                                    label="Question"
                                    placeholder="Write the question..."
                                    multiline
                                    rows={3}
                                    sx={{
                                      width: 1,
                                      bgcolor: "background.default",
                                    }}
                                    required
                                  />
                                )}
                              />

                              <Box width="100%">
                                <Controller
                                  control={control}
                                  name={`questions.${index}.type`}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <Select
                                      {...field}
                                      {...getFieldError(error)}
                                      fullWidth
                                      label="Answer type"
                                      options={recordToOptions(
                                        quizQuestionTypesOptions
                                      )}
                                      sx={{
                                        mb: 2,
                                        bgcolor: "background.default",
                                      }}
                                    />
                                  )}
                                />
                                <Controller
                                  control={control}
                                  name={`questions.${index}.isRequired`}
                                  render={({ field }) => (
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          checked={Boolean(field.value)}
                                          onChange={field.onChange}
                                        />
                                      }
                                      label="Required"
                                    />
                                  )}
                                />
                              </Box>
                            </Box>

                            <AnswerController
                              control={control}
                              currentQuestion={questions[index]}
                              index={index}
                              setValue={setValue}
                            />
                          </Box>

                          <AddQuestionButton
                            onClick={() => {
                              insert(index + 1, emptyQuestion);
                            }}
                          />
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        <Button
          color="success"
          type="submit"
          fullWidth
          sx={{
            position: "sticky",
            bottom: 0,
            color: "white",
          }}
          disabled={$updateQuestions.isPending}
          isLoading={$updateQuestions.isPending}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
