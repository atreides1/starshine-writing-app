import { Button, Typography, IconButton, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import AddIcon from "@material-ui/icons/Add";
import customStyles from "../styles/customStyles";
import React from "react";

function ChapterTab(props) {
  const classes = customStyles();

  return (
    <ListItem
      style={
        props.isSelected
          ? { border: "solid", backgroundColor: "rgba(255, 179, 0, 0.4)" }
          : { color: "#b3b3b3" }
      }
      className={classes.tab}
      divider
      onClick={(e) => {
        props.setCurrentSection(props.chapter.uuid);
      }}
    >
      <ListItemText primary={props.chapter.chapterTitle} />
    </ListItem>
  );
}

function StoryTab(props) {
  const classes = customStyles();
  let chapterTabs = props.story.chapters.map((chapter) => (
    <ChapterTab
      chapter={chapter}
      currentSection={props.currentSection}
      setCurrentSection={props.setCurrentSection}
      isSelected={chapter.uuid === props.currentSection}
      key={chapter.uuid}
    />
  ));
  let isSelected = props.story.uuid === props.currentSection;
  return (
    <div>
      <List>
        <ListItem
          style={
            isSelected
              ? { border: "solid", backgroundColor: "rgba(255, 179, 0, 0.4)" }
              : {}
          }
          className={classes.tab}
          divider
          onClick={() => {
            props.setCurrentSection(props.story.uuid);
          }}
        >
          <ListItemText primary={<Typography variant="h6">{props.story.title}</Typography>} />
        </ListItem>
        <List>
          {chapterTabs}
          <ListItem>
            <IconButton
              color="primary"
              onClick={() => props.addNewChapter(props.story.uuid)}
            >
              <LibraryAddIcon fontSize="small" edge="end" />
            </IconButton>
          </ListItem>
        </List>
      </List>
    </div>
  );
}

function LeftSidebar(props) {
  const classes = customStyles();
  let storyTabs = props.stories.map((story) => (
    <StoryTab
      story={story}
      currentSection={props.currentSection}
      setCurrentSection={props.setCurrentSection}
      addNewChapter={props.addNewChapter}
      key={story.uuid}
    />
  ));

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      elevation={6}
    >
      <List>
        <ListItem divider>
        <ListItemText primary={
          <Typography variant="h5">Story List</Typography>
        }/>
        </ListItem>
      </List>

      {storyTabs}
      <Button
        variant="outlined"
        size="large"
        color="primary"
        startIcon={<AddIcon />}
        onClick={props.addNewStory}
      >
        New Story
      </Button>
    </Drawer>
  );
}

export default LeftSidebar;
