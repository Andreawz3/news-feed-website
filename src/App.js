import './App.css';
import data from "./data/sample_news_stories.json"

function App() {
  
  const newsData = data.results;

  return (
    <div className="App">
      <h1>My News Feed</h1>
        {(newsData.map(info => 
          <div>
            <News>
              <Information 
                image={info.image_url} 
                name={info.title} 
                creator={info.creator}
                description={info.description}
                content={info.content}
                fullDescription={info.full_description}
                link={info.link}
                />
            </News>
          </div>      
        ))}
      
    </div>
  );
}

function News(props) {
  return (
    <div>
      <ul className="news">{props.children}</ul>
    </div>
  );
}

function Information(props) {
  let image;
  if (!props.image) {
    image = "https://placehold.co/600x400?text=News+Story";

  } else {
    image = props.image;
    
  }

  let creator;
  if(!props.creator) {
    creator = "Anonymous"
  } else {
    creator = props.creator;
  }

  let description = '';
  if (props.description) {
    description = props.description;

  } else if (props.content) {
    description = props.content

  } else if (props.full_description) {
    description = props.full_description
  } 

  description = reduceText(description, 250);

  function reduceText(text, index) {
    let output = text;

    if (text.length > index + 1) {
      output = replaceRemainingTextWithDots(text, index) // default case

      if (text[index] !== ' ') {
        for (let i = index - 1; i >= 0; i--) {
          if (text[i] === ' ') {
            output = replaceRemainingTextWithDots(text, i)
            break
          }      
        }
      } 
    }

    return output
  }

  function replaceRemainingTextWithDots(text, index) {
    return text.slice(0, index) + '...'
  }

  function handleDelete(e) {
    if (e.target.nodeName.toLowerCase() === "i") {
      e.currentTarget.remove();
    }
  }

  return (
    <li onClick={handleDelete}>
      <div className='news-header'>
        <div className='news-image'>
          <img  src={image} alt={props.image} />
        </div>
        <div className='news-top'>
          <a href={props.link} className="news-title">{props.name}</a>
          <p className='news-creator'>by {creator}</p>
        </div>
      </div>
      <p className='news-description'>{description}</p>
      <div className='close-button'>
        <i class="fa fa-times-circle-o"></i>
      </div>
    </li>
  );
}

export default App;
