const { Post } = require('../models');

const postdata = [
  {
    post_title: 'Donec posuere metus vitae ipsum.',
    post_text: 'Morbi non quam nec dui luctus rutrum.',
    user_id: 10
  },
  {
    post_title: 'Morbi non quam nec dui luctus rutrum.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    user_id: 8
  },
  {
    post_title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    user_id: 1
  },
  {
    post_title: 'Nunc purus.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    user_id: 4
  },
  {
    post_title: 'Pellentesque eget nunc.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    user_id: 7
  },
  {
    post_title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    user_id: 4
  },
  {
    post_title: 'In hac habitasse platea dictumst.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
 
  },
  {
    post_title: 'Morbi non quam nec dui luctus rutrum.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    
  },
  {
    post_title: 'Duis ac nibh.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
 
  },
  {
    post_title: 'Curabitur at ipsum ac tellus semper interdum.',
    post_text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
  
  }

];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;