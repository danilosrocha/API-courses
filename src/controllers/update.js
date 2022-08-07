const { findByIdService, updateService } = require("../services/courseService.js");

module.exports.handler = async (event) => {
  try {
    const id = event.pathParameters.id
    const canonical = JSON.parse(event.body)
    const course = await findByIdService(id);
    course.name = canonical.name
    course.description = canonical.description
    course.quantity = canonical.quantity
    course.teacher = canonical.teacher
    course.year = canonical.year
    course.version = canonical.version
    await updateService(course);
    let response = {
      statusCode: 200,
      body: serialize(course),
      isBase64Encoded: false
    };
    return response;
  } catch (err) {
    console.error(err);
    let response = {
      statusCode: 500,
      body: JSON.stringify(err),
    };
    return response;
  }
};
const serialize = (object) => {
    return JSON.stringify(object, null, 2)
}
