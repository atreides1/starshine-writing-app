import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

import Header from "./components/Header";
import LeftSidebar from './components/LeftSidebar';
import MainContent from "./components/MainContent";
import SaveSnackbar from "./components/SaveSnackbar";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Button, ButtonGroup, Box, Stack } from '@mui/material';
import theme from "./styles/theme";

function App() {

  const defaultStory = [
    {
      uuid: uuidv4(),
      title: "Your Title Here",
      chapters: [
        {
          chapterTitle: "Chapter 1",
          uuid: uuidv4(),
          chapterContent: "It was a dark and stormy night...",
        },
      ],
    },
  ];
  const [user, setUser] = useState("");
  const [stories, setStories] = useState(defaultStory);
  const [currentSectionUUID, setCurrentSection] = useState(null);
  const [viewSnackbar, setViewSnackbar] = useState(false);

  // load in data on login
  useEffect(() => {
    let data;
    axios
      .get(process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`)
      .then((res) => {
        data = res.data[0];
        // data exists, so put it in state
        if (data !== undefined) {
          if (data.length !== 0) {
            setStories(JSON.parse(data.stories));
            setCurrentSection(data.uuid);
          } else {
            setStories([]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const createChapter = () => {
    return {
      uuid: uuidv4(),
      chapterTitle: "Chapter __",
      chapterContent: "Your beautiful words here.",
    };
  };

  const addNewStory = () => {
    let newStory = {
      user: user,
      uuid: uuidv4(),
      title: "Enter Title Here",
      chapters: [createChapter()],
    };
    setStories([...stories, newStory]);
    setCurrentSection(newStory.uuid);
  };

  const addNewChapter = (storyUUID) => {
    let newChapter = createChapter();
    let modIdx = stories.findIndex((story) => story.uuid === storyUUID);
    let newChapters = [...stories[modIdx].chapters, newChapter];

    setStories((prevState) => {
      prevState[modIdx].chapters = newChapters;
      return [...prevState];
    });
    setCurrentSection(newChapter.uuid);
  };

  const updateSection = (sectionUUID, updatedSection) => {
    let storyIdx = stories.findIndex((story) => story.uuid === sectionUUID);
    if (storyIdx !== -1) {
      let updatedStory = { ...stories[storyIdx], ...updatedSection };
      setStories((prevState) => {
        prevState[storyIdx] = updatedStory;
        return [...prevState];
      });
    } else {
      storyIdx = stories.findIndex((story) =>
        story.chapters.find((c) => c.uuid === sectionUUID)
      );
      let chapterIdx = stories[storyIdx].chapters.findIndex(
        (chapter) => chapter.uuid === sectionUUID
      );
      let updatedChapter = {
        ...stories[storyIdx].chapters[chapterIdx],
        ...updatedSection,
      };
      setStories((prevState) => {
        prevState[storyIdx].chapters[chapterIdx] = updatedChapter;
        return [...prevState];
      });
    }
  };

  const deleteSection = (sectionUUID) => {
    let storyIdx = stories.findIndex((story) => story.uuid === sectionUUID);
    // the uuid could be a story
    if (storyIdx !== -1) {
      let updatedStories = stories.filter((story) => {
        return story.uuid !== sectionUUID;
      });
      setStories(updatedStories);

    // else the uuid is from a chapter
    } else {
      storyIdx = stories.findIndex((story) =>
        story.chapters.find((c) => c.uuid === sectionUUID)
      );
      let updatedChapters = stories[storyIdx].chapters.filter((chapter) => {
        return chapter.uuid !== sectionUUID;
      });
      setStories((prevState) => {
        prevState[storyIdx].chapters = updatedChapters;
        return [...prevState];
      });
    }
  };

  const save = () => {
    let currentSession = {
      user: user,
      stories: JSON.stringify(stories),
      uuid: currentSectionUUID || "",
    };
    let userData = [];
    // check if user has info in db
    axios
      .get(process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`)
      .then((res) => {
        console.log(res.data);
        userData = res.data;
        // if user does not have info in db, /post
        if (userData.length === 0) {
          console.log("the user does not exist");
          axios
            .post(
              process.env.REACT_APP_WEBSOCKET_SERVER + "/projects",
              currentSession
            )
            .then(() => console.log("Project successfully saved to database"))
            .catch((err) => {
              console.error(err);
            });
            setViewSnackbar(true);
        } else {
          // else, use /put to update the info
          console.log("the user does exist");
          axios
            .put(
              process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`,
              currentSession
            )
            .then(() => console.log("Project successfully saved to database"))
            .catch((err) => {
              console.error(err);
            });
            setViewSnackbar(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // docTitle, elementID
  const exportHTML = () => {
    let story = stories.find(
      (story) => story.uuid === currentSectionUUID
    );
    let chapter = stories
      .flatMap((story) => story.chapters)
      .find((c) => c.uuid === currentSectionUUID);
    let currentSection = story ? story : chapter;
    let header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

    let footer = "</body></html>";
    let title = currentSection.title || currentSection.chapterTitle;
    let sourceHTML =
      header +
      title +
      document.getElementById("displayed-section").innerHTML +
      footer;
    let source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = title + ".doc";
    fileDownload.click();
    document.body.removeChild(fileDownload);
    console.log("exported successfully!");
  };

  const deleteUserData = () => {
    // check if user has info in db
    axios
      .get(process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`)
      .then((res) => {
        // if user exists, delete
        console.log(res.data);
        if (res.data.length !== 0) {
          axios.delete(
            process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`
          );
          setStories([]);
          setCurrentSection(null);
        } else {
          // else, there is no stored data to delete, just del. from state
          setStories([]);
          setCurrentSection(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={user} onLogin={setUser} />
      <Box sx={{ display: "flex" }}>
        <LeftSidebar
          stories={stories}
          currentSection={currentSectionUUID}
          setCurrentSection={setCurrentSection}
          addNewStory={addNewStory}
          addNewChapter={addNewChapter}
        />
        <Box
          sx={(theme) => ({
            flexGrow: 1,
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <MainContent
              stories={stories}
              currentSection={currentSectionUUID}
              updateSection={updateSection}
              deleteSection={deleteSection}
            />
            {/* Snackbar for saves */}
            <SaveSnackbar
              viewSnackbar={viewSnackbar}
              setViewSnackbar={setViewSnackbar}
            />
            <ButtonGroup>
              <Button variant="contained" color="primary" onClick={save}>
                Save
              </Button>
              <Button variant="contained" onClick={deleteUserData}>
                Delete All
              </Button>
              <Button variant="contained" onClick={exportHTML}>
                Export to Word
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
