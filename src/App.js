import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { Header } from "./components/Header";
import LeftSidebar from './components/LeftSidebar';
import { Chapter, Story } from './components/Sections';
import { ThemeProvider } from "@material-ui/styles";
import theme from "./styles/theme";
import { CssBaseline, Container, Card, Button, ButtonGroup } from '@material-ui/core';
import customStyles from "./styles/customStyles"


// docTitle, elementID
  // const exportHTML = (docTitle, elementId) => {
  //   let header =
  //     "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
  //     "xmlns:w='urn:schemas-microsoft-com:office:word' " +
  //     "xmlns='http://www.w3.org/TR/REC-html40'>" +
  //     "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

  //   let footer = "</body></html>";
  //   let title = docTitle;
  //   let sourceHTML =
  //     header +
  //     title +
  //     document.getElementById(elementId).innerHTML +
  //     footer;
  //   let source =
  //     "data:application/vnd.ms-word;charset=utf-8," +
  //     encodeURIComponent(sourceHTML);
  //   let fileDownload = document.createElement("a");
  //   document.body.appendChild(fileDownload);
  //   fileDownload.href = source;
  //   fileDownload.download = title + ".doc";
  //   fileDownload.click();
  //   document.body.removeChild(fileDownload);
  //   console.log("exported successfully!");
  // };

function MainContent(props) {
  let displayedSection;
  let story = props.stories.find(story => story.uuid === props.currentSection);
  let chapter = props.stories.flatMap(story => story.chapters).find(c => c.uuid === props.currentSection);

  // Case 1: Story is selected
  if (story) {
    displayedSection = 
      <Story 
        title={story.title} 
        uuid={story.uuid} 
        chapters={story.chapters} 
        update={props.updateSection}
        delete={props.deleteSection}
      />

  // Case 2: Chapter is selected
  } else if (chapter) {
    displayedSection = (
      <Card elevation={6}>
        {/* <CardHeader
          action={
            <IconButton
              onClick={() => { props.deleteSection(chapter.uuid); }}
            >
              <Delete />
            </IconButton>
          }
          title= {chapter.chapterTitle}
        ></CardHeader> */}

        <Chapter
          uuid={chapter.uuid}
          chapterTitle={chapter.chapterTitle}
          chapterContent={chapter.chapterContent}
          key={chapter.uuid}
          update={props.updateSection}
          delete={props.deleteSection}
        />
      </Card>
    );

  // Case 3: Nothing is selected
  } else {
    displayedSection = <p>Try creating or selecting a story!</p>
  }
  return <div>{displayedSection}</div>;
}

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
  const [user, setUser]       = useState("");
  const [stories, setStories] = useState(defaultStory);
  const [currentSectionUUID, setCurrentSection] = useState(null);
  
  // load in data on login
  useEffect(() => {
    let data;
    axios.get(process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`)
      .then(res => {
        data = res.data[0];
        // data exists, so setState
        if (data !== undefined) {
          if (data.length !== 0 ) {
            setStories(JSON.parse(data.stories));
            setCurrentSection(data.uuid);
          } else {
            setStories([]);
          }
        } 
      })
      .catch((err) => {
        console.log(err);
      })
    
  }, [user]);

  const createChapter = () => {
    return {
      uuid: uuidv4(),
      chapterTitle: "Chapter __",
      chapterContent: "Your beautiful words here.",
    }
  };

  const addNewStory = () => {
    let newStory = {
      user: user,
      uuid: uuidv4(),
      title: "Enter Title Here",
      chapters: [ createChapter() ],
    };
    setStories([...stories, newStory]);
    setCurrentSection(newStory.uuid);
  }

  const addNewChapter = (storyUUID) => {
    let newChapter = createChapter();
    let modIdx  = stories.findIndex(story => story.uuid === storyUUID);
    let newChapters = [ ...stories[modIdx].chapters, newChapter ];

    setStories((prevState) => {
      prevState[modIdx].chapters = newChapters;
      return([
        ...prevState,
        
      ])
    })
    setCurrentSection(newChapter.uuid);
  }

  const updateSection = (sectionUUID, updatedSection) => {
    let storyIdx = stories.findIndex(story => story.uuid === sectionUUID);
    if (storyIdx !== -1) {
      let updatedStory = {...stories[storyIdx], ...updatedSection}
      setStories((prevState) => {
        prevState[storyIdx] = updatedStory;
        return([ ...prevState ]);
      });

    } else {
      storyIdx = stories.findIndex(story => story.chapters.find(c => c.uuid === sectionUUID));
      let chapterIdx = stories[storyIdx].chapters.findIndex(chapter => chapter.uuid === sectionUUID);
      let updatedChapter = {...stories[storyIdx].chapters[chapterIdx], ...updatedSection}
      setStories((prevState) => {
        prevState[storyIdx].chapters[chapterIdx] = updatedChapter;
        return([ ...prevState ])
      });
    }
  }

  const deleteSection = (sectionUUID) => {
    let storyIdx = stories.findIndex(story => story.uuid === sectionUUID);
    if (storyIdx !== -1) {
      // let updatedStory = {...stories[storyIdx], ...updatedSection}
      let updatedStories= stories.filter((story) => {return story.uuid !== sectionUUID})
      setStories(updatedStories);
      // setStories((prevState) => {
      //   let newState = prevState.filter((story) => {return story.uuid !== sectionUUID})
      //   // prevState[storyIdx] = updatedStory;
      //   return([ ...newState ]);
      // });
    // else the section is a chapter
    } else {
      storyIdx = stories.findIndex(story => story.chapters.find(c => c.uuid === sectionUUID));
      let updatedChapters = stories[storyIdx].chapters.filter((chapter) => {return chapter.uuid !== sectionUUID});

      // let chapterIdx = stories[storyIdx].chapters.findIndex(chapter => chapter.uuid === sectionUUID);
      // let updatedChapter = {...stories[storyIdx].chapters[chapterIdx], ...updatedSection}
      setStories((prevState) => {
      //   let updatedChapters = prevState[storyIdx].chapters.filter((chapter) => {return chapter.uuid !== sectionUUID})
        prevState[storyIdx].chapters = updatedChapters;
        return([ ...prevState ])
      });
    }
  }

  const save = () => {
    let currentSession = {
      user: user,
      stories: JSON.stringify(stories),
      uuid: currentSectionUUID || ""
    };
    let userData = [];
    // check if user has info in db
    axios.get(process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`)
      .then(res => {
        console.log(res.data);
        userData = res.data;
        // if user does not have info in db, /post
        if (userData.length === 0) {
          console.log("the user does not exist");
          axios.post(
            process.env.REACT_APP_WEBSOCKET_SERVER + "/projects", currentSession)
            .then(() => console.log("Project successfully saved to database"))
            .catch(err => {
              console.error(err);
            });
        } else {
          // else, use /put to update the info
          console.log("the user does exist");
          axios.put(
            process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`, currentSession)
            .then(() => console.log("Project successfully saved to database"))
            .catch(err => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteUserData = () => {
    // check if user has info in db
    axios.get(process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`)
      .then(res => {
        // if user exists, delete
        console.log(res.data);
        if (res.data.length !== 0) {
          axios.delete(process.env.REACT_APP_WEBSOCKET_SERVER + `/projects/${user}`);
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
      })
  }

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
          {/* A "cheaty" way of adding equal space before these buttons */}
          <div className={classes.toolbar}></div>
          <ButtonGroup>
            <Button variant="contained" color="primary" onClick={save}>
              Save
            </Button>
            <Button variant="contained" onClick={deleteUserData}>
              Delete All
            </Button>
          </ButtonGroup>
          <div className={classes.toolbar}></div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
