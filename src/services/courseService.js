const { save, findAll, findById, update } = require("../repositories/courseRepository.js");
const { v4: uuidv4 } = require("uuid");

const findAllService = async () => {
    const resultCourses = await findAll();
    return resultCourses;
}

const findByIdService = async (id) => {
    const resultCourses = await findById(id);
    return resultCourses;
}

const saveService = async (course) => {
    const currentDateTime = new Date().toISOString()
    course.id = uuidv4();
    course.activate = true;
    course.createdAt = currentDateTime;
    course.updatedAt = currentDateTime;
    return await save(course);
}

const updateService = async (course) => {
    const currentDateTime = new Date().toISOString()
    course.updatedAt = currentDateTime
    return await update(course);
}

const removeService = async (course) => {
    const currentDateTime = new Date().toISOString()
    course.updatedAt = currentDateTime
    course.activate = false
    const resultCourses = await update(course);
    return resultCourses;
}

module.exports = { 
    findAllService,
    findByIdService,
    saveService,
    updateService,
    removeService
}