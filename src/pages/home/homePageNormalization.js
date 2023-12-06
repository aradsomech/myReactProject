const homePageNormalization = (cards, myUserId) => {
  for (let card of cards) {
    // if (user.likes.find((userId) => userId === id)) {
    //   user.likes = true;
    // } else {
    //   user.likes = false;
    // }
    card.likes = Boolean(card.likes.find((userId) => userId === myUserId));
  }
  return cards;
};
export default homePageNormalization;
