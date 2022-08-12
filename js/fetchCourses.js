/*
Description:
    A function that fetches the courses from JSON Server
Input: None
Output: Fetched courses Type: promise
*/
const fetchCourses = async () => {
  const response = await fetch("http://localhost:8000/courses");
  const courses = await response.json();
  return courses;
};

/*
Description:
    A function shows the fetched courses
Input:
    1- Courses type  : Array of Objects
    2- Filter string : String to filter courses (if empty then fetch all courses)
Output: Fetched courses Type: promise
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

// Variable used to store the fetched courses
let courses;

/*
Description:
    Fetch and show courses on load
Input   : None
Output  : None
*/
window.onload = async () => {
  courses = await fetchCourses();
  const courseSection = document.querySelector("#courses");
  courseSection.innerHTML = showCourses(courses, "");
};

/*
Description:
    An key up handler for search input that takes the current value and search for it
Input   : None
Output  : None
*/

document.querySelector("#submit-search").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("clicked");
  const filterString = document.querySelector("#search-input");
  const courseSection = document.querySelector("#courses");
  courseSection.innerHTML = showCourses(
    courses,
    filterString.value.toUpperCase()
  );
});
