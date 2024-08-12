// app/quiz/quiz.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/quizme", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "Generate quiz questions about historical events.",
          }),
        });

        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  return (
    <Box sx={{ py: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container maxWidth="md">
        <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
          Quiz Me
        </Typography>
        <Grid container spacing={4}>
          {questions.map((q, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {q.question}
                  </Typography>
                  {q.options.map((option, i) => (
                    <Button
                      key={i}
                      variant={
                        showResults
                          ? option === q.answer
                            ? "contained"
                            : selectedAnswers[index] === option
                            ? "outlined"
                            : "text"
                          : selectedAnswers[index] === option
                          ? "contained"
                          : "outlined"
                      }
                      color={
                        showResults
                          ? option === q.answer
                            ? "success"
                            : selectedAnswers[index] === option
                            ? "error"
                            : "primary"
                          : "primary"
                      }
                      onClick={() => handleOptionClick(index, option)}
                      sx={{ mb: 1, width: "100%" }}
                    >
                      {option}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleQuizSubmit}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
          >
            Submit Quiz
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Quiz;