const { findAllService } = require("../services/courseService.js");

module.exports.handler = async () => {
  try {
    const courses = await findAllService();
    let response = {
      statusCode: 200,
      body: serialize(courses),
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
