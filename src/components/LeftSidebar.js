import { Button, Typography, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddIcon from "@mui/icons-material/Add";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import React from "react";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

function ChapterTab(props) {

  return (
    <ListItem
      style={
        props.isSelected
          ? { border: "solid", backgroundColor: "rgba(255, 179, 0, 0.4)" }
          : { color: "#b3b3b3" }
      }
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
          divider
          onClick={() => {
            props.setCurrentSection(props.story.uuid);
          }}
        >
          <ListItemText
            primary={<Typography variant="h6">{props.story.title}</Typography>}
          />
        </ListItem>
        <List>
          {chapterTabs}
          <ListItem>
            <IconButton
              color="primary"
              onClick={() => props.addNewChapter(props.story.uuid)}
              size="large"
              sx={{ margin: "auto" }}
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
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        }
      }}
    >
      <List>
        <ListItem divider>
          <ListItemText
            primary={<Typography variant="h5">Story List</Typography>}
          />
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
