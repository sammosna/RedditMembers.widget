import { React } from "uebersicht";
import { styled } from "uebersicht";
import { css } from "uebersicht";

const fontSize = "12px";

// prettier-ignore
const subsreddits = [
  "cardano",
  "elrondnetwork",
  "safemoon",
  "faireclipse"
];

export const command = () => {};

/*********************************************************************
 * the refresh frequency in milliseconds
 * 21600000 = every 6h
 * 43200000 = every 12h
 * 86400000 = every 24h / day
 *********************************************************************/
export const refreshFrequency = 21600000;

const Test = ({ className }) => {
  const [subs, setSubs] = React.useState();

  React.useEffect(() => {
    if (subs) return;
    var subsArr = [];
    const promises = Array.from(subsreddits, (s, i) => {
      console.log(i);
      return new Promise(resolve => {
        fetch(`https://www.reddit.com/r/${s}/about.json`)
          .then(response => response.json())
          .then(jsonData => {
            // jsonData is parsed json object received from url
            // console.log(jsonData.data.subscribers)
            subsArr.push({
              i: i,
              sub: s,
              name: jsonData.data.display_name,
              icon: jsonData.data.icon_img,
              members: jsonData.data.subscribers
            });
            console.log(jsonData.data);
            resolve();
          })
          .catch(error => {
            // handle your errors here
            console.error(error);
          });
      });
    });

    Promise.all(promises.flat()).then(data => {
      // console.log("ALL DATA", subsArr)
      const subsSorted = subsArr.sort((a, b) =>
        a.i > b.i ? 1 : b.i > a.i ? -1 : 0
      );
      setSubs(subsSorted);
    });
  }, [subs]);

  return (
    <div className={container}>
      <div className={redditDiv}>
        {subs &&
          subs.map(m => (
            <div className={subElem}>
              {m.icon && (<img src={m.icon} alt="" className={subIcon} />)}
              {!m.icon && (<span className={subIconAlt}>
                <RedditLogo viewBox="-10 -10 10 10" />
              </span>)}
              <div>
                <div className={subName}>{m.name}</div>
                <div className={subMembers}>{m.members}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const StyledReddit = styled(Test)``;

const container = css`
  transition-duration: 0.3s;
  font-size: ${fontSize};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 0.8em;
  background-color: rgba(255, 255, 255, 0.2);
  margin-top: 2em;
  margin-left: 2em;
  border-radius: 6px;
  -webkit-backdrop-filter: blur(16px) brightness(80%) contrast(100%)
    saturate(140%);
  backdrop-filter: blur(16px) brightness(80%) contrast(100%)
    saturate(140%);
`;

const redditDiv = css`
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 6px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;
const subElem = css`
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0.3em 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const subIcon = css`
  height: 3em;
  width: 3em;
  border: 1px solid #ccc;
  object-fit: contain;
  object-position: center;
  border-radius: 6px;
  margin-right: 1em;
`;

const subIconAlt = css`
  height: 3em;
  width: 3em;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 6px;
  margin-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    opacity: 0.5
  }


`;
const subName = css``;
const subMembers = css`
  font-size: 0.8em;
`;

export const render = props => {
  return (
    // <div className="quote-of-the-day-container">
    // 	<div className="quote-of-the-day">
    //     <pre>
    //       {JSON.stringify(quote_of_the_day)}
    //     </pre>
    // 		<h5 className="title">{quote_of_the_day.title}</h5>
    // 		<blockquote className="quote" cite="https://quotes.rest/qod">{quote_of_the_day.quote}</blockquote>
    // 		<cite className="author">???{quote_of_the_day.author}</cite>
    // 		<img className="image" src={quote_of_the_day.background} />
    // 	</div>
    // </div>
    <div>
      <StyledReddit />
    </div>
  );
};


function RedditLogo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2.5em"
      height="2.5em"
      viewBox="0 0 100 100"
    >
      <path fill="#fff" d="M25.098 43.863a5.574 5.574 0 00-3.432-1.207c-3.07 0-5.566 2.5-5.566 5.572 0 1.78.859 3.422 2.254 4.455 1.158-3.314 3.507-6.324 6.744-8.82zm47.65-13.746c2.293 0 4.158-1.867 4.158-4.162s-1.865-4.16-4.158-4.16c-2.295 0-4.164 1.865-4.164 4.16s1.869 4.162 4.164 4.162z" />
      <path fill="#fff" d="M48.875 0C21.883 0 0 21.883 0 48.875S21.883 97.75 48.875 97.75 97.75 75.867 97.75 48.875 75.867 0 48.875 0zm30.854 55.033c.131.77.215 1.549.215 2.344 0 11.439-14.002 20.744-31.214 20.744-17.211 0-31.211-9.305-31.211-20.744 0-.844.098-1.67.246-2.486a7.733 7.733 0 01-3.832-6.662c0-4.268 3.469-7.737 7.734-7.737 1.949 0 3.805.775 5.229 2.088 5.506-3.59 12.998-5.828 21.268-5.928l4.815-15.229a1.084 1.084 0 011.283-.729l12.604 2.967c.922-2.354 3.204-4.031 5.883-4.031a6.334 6.334 0 016.326 6.326c0 3.488-2.839 6.328-6.326 6.328a6.336 6.336 0 01-6.328-6.328c0-.059.015-.111.017-.17l-11.693-2.754-4.32 13.658c7.908.283 15.051 2.508 20.326 6 1.434-1.385 3.309-2.199 5.332-2.199 4.266 0 7.738 3.471 7.738 7.738a7.683 7.683 0 01-4.092 6.804z" />
      <path fill="#fff" d="M33.664 53.539c0-2.539 2.066-4.605 4.605-4.605s4.604 2.066 4.604 4.605-2.064 4.604-4.604 4.604-4.605-2.065-4.605-4.604zm26.383 13.652c-2.32 2.322-5.963 3.449-11.135 3.449-.012 0-.023-.009-.037-.009s-.025.009-.039.009c-5.172 0-8.814-1.127-11.135-3.449a1.084 1.084 0 011.533-1.531c1.893 1.895 5.033 2.814 9.602 2.814.014 0 .025.008.039.008s.025-.008.037-.008c4.57 0 7.711-.92 9.604-2.814a1.082 1.082 0 111.531 1.531zm-.549-9.048c-2.537 0-4.604-2.063-4.604-4.604s2.065-4.605 4.604-4.605 4.604 2.066 4.604 4.605-2.065 4.604-4.604 4.604zM76.08 42.656a5.543 5.543 0 00-3.57 1.313c3.217 2.516 5.539 5.546 6.66 8.878a5.524 5.524 0 002.48-4.619 5.576 5.576 0 00-5.57-5.572z" />
    </svg>
  )
}