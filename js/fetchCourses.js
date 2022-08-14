/**
 * This function fetches all courses from JSON server
 *
 * @returns {Promise} - A promise that contains all fetched courses from JSON Server
 */
const fetchCourses = async () => {
  const response = await fetch("http://localhost:8000/courses");
  const courses = await response.json();
  return courses;
};

/**
 *
 * @param {Array} courses - An array of courses Objects
 * @param {String} filterString - A string to filter the courses according their title (if empty then fetch all courses)
 * @returns {String} - A string that contains tha HTML for all courses
 */
const showCourses = (courses, filterString) => {
  let coursesDiv = "";
  courses.forEach((course) => {
    if (
      filterString === "" ||
      course.title.toUpperCase().indexOf(filterString) > -1
    ) {
      const courseHTMLStr = `
        <div class="course">
            <img src="${course.image}" alt="${course.alt}" height="135">
            <a href="${course.image}">
                <h4 class="course-title">${course.title}</h3>
            </a>
            <p class="course-instructor">>${course.author}</p>
            <div class="stars">
                <i class="course-rate">${course.rating}</i>
                <i class="fa fa-star checked"></i>
                <i class="fa fa-star checked"></i>
                <i class="fa fa-star checked"></i>
                <i class="fa fa-star checked"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <p class="course-students">(${course.people})</p>
            </div>
            <h4 class="course-price">E&#163;${course.price}</h4>
            <p class="course-discount">E&#163;${course.discount}</p>
            ${
              course.bestseller === "true"
                ? '<span class="best-seller">Bestseller</span>'
                : ""
            }
        </div>
        `;
      coursesDiv += courseHTMLStr;
    }
  });
  return coursesDiv;
};

/**
 * @type {Array} - Carry all filtered fetched courses
 */
let courses;

/**
 * Fetch and show courses on load
 */
window.onload = async () => {
  courses = await fetchCourses();
  const courseSection = document.querySelector("#courses");
  courseSection.innerHTML = showCourses(courses, "");
};

/**
 * An on click handler for search input that takes the current value from search input and search for it
 */
document.querySelector("#submit-search").addEventListener("click", (event) => {
  event.preventDefault();
  const filterString = document.querySelector("#search-input");
  const courseSection = document.querySelector("#courses");
  courseSection.innerHTML = showCourses(
    courses,
    filterString.value.toUpperCase()
  );
});
