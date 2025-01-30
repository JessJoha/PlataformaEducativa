
const { Course } = require('../../../createCourses/src/Model/courseModel');


const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    
    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

   
    await course.destroy();

    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ error: 'Error deleting course' });
  }
};

module.exports = {
  deleteCourse,
};
