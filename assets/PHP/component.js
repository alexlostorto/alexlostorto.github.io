class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <!-- Navbar  -->
        <div class="nav-container">
        <nav class="navbar">
          <ul class="logo" href="">
            <li><a class="logo-text" href="../../index.html">Alex</a></li>
            <li><a class="logo-circle" href="../../index.html">.</a></li>
          </ul>
          <a href="#" class="toggle-button">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </a>
        </nav>
        <ul class="navbar-items">
          <li>
            <a class="navbar-item" href="../../Assets/Documents/CV 2 (PDF).pdf" target="_blank">Resume</a>
          </li>
          <li class="resources-button">
            <a class="navbar-item" href="#">Resources</a>
            <div class="nav-resources">
              <ul>
                <li>
                  <a href="../../resources/exam-timetable/index.html">Exam Timetable</a>
                </li>
                <li>
                <a href="../../resources/revision-buddy/index.html">Revision Buddy</a>
                </li>
                <li>
                  <a href="../../resources/leaderboard/index.html">Leaderboard</a>
                </li>
                <li>
                  <a href="https://alexlostorto.github.io/magic-notes/">Magic Notes</a>
                </li>
                <li>
                  <a href="../../resources/insta-size/index.html">Insta Size</a>
                </li>
                <li>
                  <a href="../../resources/word-wrap/index.html">Word Wrap</a>
                </li>
                <li>
                  <a href="../../resources/chemistry/index.html">Chemistry</a>
                </li>
                <li>
                  <a href="../../resources/music/index.html">Music</a>
                </li>
                <li class="subcategory-button">
                  <a href="#">Maths</a>
                  <div class="nav-subcategory">
                    <ul>
                      <li>
                        <a href="../../resources/trigonometry/index.html">Trigonometry</a>
                      </li>
                      <li>
                        <a href="../../resources/quadratics/index.html">Quadratics</a>
                      </li>
                      <li>
                        <a href="../../resources/sequences/index.html">Sequences</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="../../resources/useful-links/index.html">Useful Links</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a class="navbar-item" href="../../index.html#contact">Contact</a>
          </li>
        </ul>
      </div>
        `
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer-container">
            <div class="spacer"></div>
            <div class="footer">
            <p>Designed and built by Alex lo Storto</p>
            <p id="visits">👀</p>
            </div>
        </footer>
        `
    }
}

customElements.define("app-navbar", Navbar);
customElements.define("app-footer", Footer);