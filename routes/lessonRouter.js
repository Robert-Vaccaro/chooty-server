const lessonController = require('../controllers/lessonController');

const routes = [
    {
        method: 'GET',
        url: '/api/v1/lessons/:id',
        handler: lessonController.getLessonById
    },
    {
        method: 'GET',
        url: '/api/v1/courses/:courseId/lessons',
        handler: lessonController.getLessonByCourseId
    }
]

module.exports = routes;