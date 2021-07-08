import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import MainContent from "./components/MainContent";
import SaveSnackbar from "./components/SaveSnackbar";

import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, Container, Button, ButtonGroup } from "@material-ui/core";
import customStyles from "./styles/customStyles";
import theme from "./styles/theme";

function App() {
  const classes = customStyles();

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
    //if user if not null, check localStorage/db to see if data exists
    let data = localStorage.getItem("savedSessions");
    data = JSON.parse(data);
    if (data !== null) {
      // find user
      data = data.find((session) => session.user === user);
      if (data !== undefined) {
        console.log("looky, the user is there");
        setStories(data.stories);
        setCurrentSection(data.uuid);
      }
    }
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
        stories: stories,
        uuid: currentSectionUUID,
      };
      // check localStorage in case we already have data
      let savedSessions = localStorage.getItem("savedSessions");
      savedSessions = JSON.parse(savedSessions);
      if (savedSessions !== null) {
        // check if user already has data
        let curr_user = savedSessions.find((session) => session.user === user);
        if (curr_user !== undefined) {
          curr_user.stories = stories;
          curr_user.uuid = currentSectionUUID;
        } else {
          savedSessions = [...savedSessions, currentSession];
        }
      } else {
        savedSessions = [currentSession];
      }
      localStorage.setItem("savedSessions", JSON.stringify(savedSessions));
      // setViewSnackbar(true);
    };

  // docTitle, elementID
  const exportHTML = () => {
    let story = stories.find((story) => story.uuid === currentSectionUUID);
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Header user={user} onLogin={setUser} />
        <LeftSidebar
          stories={stories}
          currentSection={currentSectionUUID}
          setCurrentSection={setCurrentSection}
          addNewStory={addNewStory}
          addNewChapter={addNewChapter}
        />
        <Container>
          <div className={classes.toolbar}></div>
          <div className={classes.toolbar}></div>

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
          {/* A "cheaty" way of adding equal space before and after these buttons */}
          <div className={classes.toolbar}></div>
          <ButtonGroup>
            <Button variant="contained" color="primary" onClick={save}>
              Save
            </Button>
            <Button variant="contained" onClick={exportHTML}>
              Export to Word
            </Button>
          </ButtonGroup>
          <div className={classes.toolbar}></div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
