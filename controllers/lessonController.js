const boom = require('boom');

// Get lesson by lesson ID
exports.getLessonById = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const lesson = 'lesson' // TODO: Replace with DynamoDB call
        return lesson;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Get all lessons by course ID
exports.getLessonByCourseId = async (req, res) => {
    try {
        const courseId = req.params.id;
        const lessons = ['lesson1', 'lesson2']; // TODO: Replace with DynamoDB call
        return lessons;
    } catch (err) {
        throw boom.boomify(err);
    }
}