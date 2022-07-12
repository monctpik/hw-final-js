"use strict";
const socialMap = new Map();
socialMap.set("www.facebook.com", "fa-facebook-f");
socialMap.set("twitter.com", "fa-twitter");
socialMap.set("www.instagram.com", "fa-instagram");

const listActors = [];

fetch("./js/data.json")
  .then((resolve) => resolve.json())
  .then((actors) => {
    const HTMLCollectionActors = actors
      .filter((actor) => actor.firstName || actor.lastName)
      .map((actor) => createActorCard(actor));

    return actorsBlockList.append(...HTMLCollectionActors);
  });

function createActorsCard({
  id,
  firstName,
  lastName,
  profilePicture,
  contacts,
}) {
  const actors = createElement("div", { classNames: ["actors"] }, wrapper);
  const wrapper = createElement(
    "div",
    { classNames: ["container"] },
    actorsTitle,
    actorsBlockList,
    actorList
  );
  const actorsTitle = createElement(
    "div",
    { classNames: ["actors-title"] },
    actorsTitleText
  );
  const actorsTitleText = createElement(
    "h1",
    { classNames: ["actors-title-text"] },
    document.createTextNode("Actorrs")
  );
  const actorsBlockList = createElement(
    "div",
    { classNames: ["actors-block-list"] },
    actor
  );

  const actorNoImageCircle = createElement(
    "div",
    {
      classNames: ["actor-no-image-circle"],
      attributes: { id: `actor-no-image-circle-${id}` },
    },
    actorNoImageInitials
  );
  const actorNoImageInitials = createElement(
    "div",
    {
      classNames: ["actor-no-image-initials"],
      styles: {
        backgroundColor: stringToColour(
          `${firstName} ${lastName}`.trim() || "No Name"
        ),
      },
    },
    document.createTextNode(
      createInitials(`${firstName} ${lastName}`.trim() || "No Name")
    )
  );
  const actorImage = createElement("img", {
    classNames: ["actor-avatar"],
    attributes: {
      src: profilePicture,
      alt: `${firstName} ${lastName}`,
      "data-wrapper-id": `actor-avatar-circle-${id}`,
    },
    events: { error: handlerError, load: handlerLoadPhoto },
  });
  const actorFullName = createElement(
    "h2",
    { classNames: ["actor-full-name"], attributes: { id: `actor-fio-${id}` } },
    document.createTextNode(`${firstName} ${lastName}`)
  );
  const actorSocialLinks = contacts.map((item) => {
    const hostName = new URL(item).hostname;
    return createElement(
      "div",
      { classNames: ["actor-social"] },
      createElement("a", {
        classNames: ["actor-social-link", "fa-brands", socialMap.get(hostName)],
        attributes: { href: item, target: "_blank" },
      })
    );
  });
  const actorSocials = createElement(
    "div",
    { classNames: ["actor-socials"] },
    ...actorSocialLinks
  );

  const actor = createElement(
    "article",
    {
      classNames: ["actor"],
      attributes: { "data-actor-id": `actor-fio-${id}` },
      events: { click: addActorToList },
    },
    actorNoImageCircle,
    actorFullName,
    actorSocials
  );
  return actor;
}

const actorListP = createElement(
  "p",
  {},
  document.createTextNode("You choosed")
);

const actorList = createElement(
  "ul",
  { classNames: ["actors-list"] },
  actorListP
);

//
// 
// 
// 
// 


function createElement(
  tag,
  { classNames = [], styles = {}, attributes = {}, events = {} },
  ...children
) {
  const element = document.createElement(tag);

  if (classNames.length) {
    element.classList.add(...classNames);
  }

  for (const [nameStyle, valueStyle] of Object.entries(styles)) {
    element.style[nameStyle] = valueStyle;
  }

  for (const [nameAttr, valueAttr] of Object.entries(attributes)) {
    element.setAttribute(nameAttr, valueAttr);
  }

  for (const [typeEvent, handlerEvent] of Object.entries(events)) {
    element.addEventListener(typeEvent, handlerEvent);
  }

  element.append(...children);

  return element;
}

function createInitials(str) {
  return str
    .split(" ")
    .map((elem) => elem.slice(0, 1).toUpperCase())
    .join("");
}
function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).slice(-2);
  }
  return colour;
}
