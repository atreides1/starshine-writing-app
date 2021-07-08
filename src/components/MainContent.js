import { Chapter, Story } from "./Sections";
import Card from '@material-ui/core/Card';

function MainContent(props) {
  let displayedSection;
  let story = props.stories.find(
    (story) => story.uuid === props.currentSection
  );
  let chapter = props.stories
    .flatMap((story) => story.chapters)
    .find((c) => c.uuid === props.currentSection);

  // Case 1: Story is selected
  if (story) {
    displayedSection = (
      <Story
        title={story.title}
        uuid={story.uuid}
        chapters={story.chapters}
        update={props.updateSection}
        delete={props.deleteSection}
      />
    );

    // Case 2: Chapter is selected
  } else if (chapter) {
    displayedSection = (
      <Card elevation={6}>
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
    displayedSection = <p>Try creating or selecting a story!</p>;
  }
  return <div id="displayed-section">{displayedSection}</div>;
}

export default MainContent;