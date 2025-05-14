import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/hci.jpg" width={200} />
            <div>
              <h5> CS1235 HumanComputer Interaction </h5>
              <p className="wd-dashboard-course-title">
                Usability and User Experience
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/python.jpg" width={200} />
            <div>
              <h5> CS1236 Python </h5>
              <p className="wd-dashboard-course-title">
                Introduction to CS with Python
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/cybersecurity.jpg" width={200} />
            <div>
              <h5> CS1237 Cybersecurity </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Cybersecurity
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/networking.jpeg" width={200} />
            <div>
              <h5> CS1238 Computer Networking </h5>
              <p className="wd-dashboard-course-title">
                Networking Fundamentals
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          {" "}
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/javascript.jpg" width={200} />
            <div>
              <h5> CS1239 JavaScript </h5>
              <p className="wd-dashboard-course-title">Learning JavaScript</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          {" "}
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/databases.jpg" width={200} />
            <div>
              <h5> CS1240 Relational Databases </h5>
              <p className="wd-dashboard-course-title">
                Database Engineering and Analytics
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
