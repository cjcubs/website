class cHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
        // <header class="banner">
           <nav>
                <a href="index.html">statement</a>
                <a href="fiction.html">fiction</a>
                <a href="essays.html">essays</a>
                <a href="paintings.html">paintings</a>
                <a href="notes.html">notes</a>
            </nav>
	    // </header>
    }
}
customElements.define('c-header', cHeader);

class cFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
        <footer>
		    <p>Outside my ramblings I'd like to thank you for showing the care and follow-through to actually visit something I've worked on. I can never thank you enough.</p>
	    </footer>
    }
}

customElements.define('c-footer', cFooter);

async function resizeMasonryItem(item) {
    let childImage = item.querySelector('img');
    if (childImage.complete) { // ensure image has loaded
      item.style.gridRowEnd = "span " + Math.floor((childImage.getBoundingClientRect().height + 32) / 10);
      return true;
    } else {
      return false;
    }
  }
  
  async function setupMasonry() {
    let masonryItems = document.getElementsByClassName('masonry-item');
    for (item of masonryItems) {
      if (item.getAttribute("m") != "done") {
        if (!(await resizeMasonryItem(item))) {
          setTimeout(setupMasonry, 250);
          break;
        } else {
          item.setAttribute("m", "done"); // mark the item as resized so we can skip it
        }
      }
    }
  }
  
  async function setupMasonryResize() {
    let masonryItems = document.getElementsByClassName('masonry-item');
    for (item of masonryItems) {
      item.setAttribute("m", "resize"); // un-mark all the items so we can re-compute
    }
    setupMasonry();
  }
  
  setupMasonry();
  
  window.addEventListener("resize", setupMasonryResize);