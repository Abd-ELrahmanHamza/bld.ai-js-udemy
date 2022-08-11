const fetchCourses = async () => {
  const response = await fetch("http://localhost:8000/courses");
  const courses = await response.json();
  return courses;
};
window.onload = async () => {
  let courses = await fetchCourses();
  const courseSection = document.querySelector("#courses");
  courses.forEach((course) => {
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
    courseSection.innerHTML += courseHTMLStr;
  });
};
