//Escape regex special characters so names like "O'Brien (Anna)" can't break the search
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = escapeRegex;
