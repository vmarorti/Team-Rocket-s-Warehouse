module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  tradeButtons: (post) => {
    console.log(post['fortrades.trade_pokemon'])
    return post['fortrades.trade_pokemon'] != null;
  },
  tradeStatus: (post) => {
    return post['fortrades.trade'] != null;
  },
  acceptedOrdenied: (post) => {
    return post['fortrades.trade'];
  },
};
