// Filters out:
// - Emacs backup '#filename.ext', '#filename.ext#'
// - Vim backup 'filename.ext~'
// - Hidden files '.filename.ext'
module.exports = function(name) {
    return !/(^\.|#|~)/i.test(name);
};
