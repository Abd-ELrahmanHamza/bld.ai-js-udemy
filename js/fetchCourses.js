/**
 * This function fetches all courses from JSON server
 *
 * @param {String} courseName - The courses with this topic name
 * @returns {Promise} - A promise that contains all fetched courses from JSON Server
 */
const fetchCourses = async (courseName) => {
  console.log(courseName.replace(" ", ""));
  const response = await fetch(
    `http://localhost:8000/${courseName.replace(" ", "")}`
  );
  const courses = await response.json();
  return courses;
};

/**
 *
 * @param {Array} data - Array contains all courses
 * @param {Integer} n - The size of group
 * @returns {2D Array} - Array contains a group of courses represented by arrays
 */
function groupCourses(data, n) {
  var group = [];
  for (var i = 0, j = 0; i < data.length; i++) {
    if (i >= n && i % n === 0) j++;
    group[j] = group[j] || [];
    group[j].push(data[i]);
  }
  return group;
}

/**
 * A function that builds the HTML string of the course
 *
 * @param {Object} course - An Object that contains a single course information
 * @returns {String} - A string of HTML representation of a course
 */
const buildCourse = (course) => {
  const courseHTMLStr = `
          <div class="course">
              <img src="${course.image}" alt="${course.alt}" height="135">
              <a href="${course.image}">
                  <h4 class="course-title">${course.title}</h3>
              </a>
              <p class="course-instructor">${course.author}</p>
              <div class="stars">
                  <i class="course-rate">${
                    Math.round(course.rating * 10) / 10
                  }</i>
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
  return courseHTMLStr;
};

/**
 *
 * @param {Array} courses - An array of courses Objects
 * @param {String} filterString - A string to filter the courses according their title (if empty then fetch all courses)
 * @returns {String} - A string that contains tha HTML for all courses
 */
const showCourses = (courses, filterString) => {
  // holds the result html for all courses
  let coursesDiv = "";

  // Filter courses according to the search string
  courses = courses.filter(
    (course) => course.title.toUpperCase().indexOf(filterString) > -1
  );

  // Group courses for each slide
  const coursesGroups = groupCourses(courses, 5);

  // build each slide of html
  for (let i = 0; i < coursesGroups.length; i++) {
    coursesDiv += `<div class="carousel-item ${i === 0 ? "active" : ""}">`;
    coursesDiv += `<div class="courses" id="courses">`;
    coursesGroups[i].forEach((course) => {
      coursesDiv += buildCourse(course);
    });
    coursesDiv += `</div>`;
    coursesDiv += `</div>`;
  }

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
  const courseName = document.querySelector(".course-item.active").textContent;
  courses = await fetchCourses(courseName);
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

// Add an event listener to each one of courses list
const coursesNames = document.querySelectorAll(".course-item");
for (let i = 0; i < coursesNames.length; i++) {
  coursesNames[i].addEventListener("click", async (event) => {
    event.preventDefault();

    // Get topic name to fetch it's courses from database
    const newCourseName = coursesNames[i].textContent;
    courses = await fetchCourses(newCourseName);
    const courseSection = document.querySelector("#courses");
    courseSection.innerHTML = showCourses(courses, "");

    // Add active class to selected topic and remove it from other topics
    coursesNames[i].classList.add("active");
    for (let j = 0; j < coursesNames.length; j++) {
      if (j !== i) coursesNames[j].classList.remove("active");
    }
  });
}
