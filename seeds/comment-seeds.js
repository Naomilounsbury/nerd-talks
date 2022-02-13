const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Nunc rhoncus dui vel sem.',
   

  },
  {
    comment_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',


  },
  {
    comment_text: 'Aliquam erat volutpat. In congue.',

  
  },

];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
