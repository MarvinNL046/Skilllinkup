import { DateTime } from 'luxon'

export const slugify = function(text) {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

export function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}

export const SortingByDate = function(posts) {
  return posts
  .sort((post1, post2) => {

    const beforeDate = DateTime.fromFormat(post1.date, "LLL dd yyyy");
    const afterDate = DateTime.fromFormat(post2.date, "LLL dd yyyy");
    return afterDate - beforeDate;

})
}
