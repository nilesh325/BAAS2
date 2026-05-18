function loadNavbar() {
  document.getElementById("navbar").innerHTML = `
    <nav>
      <div class="nav-inner">
        <a class="nav-logo" href="/home">BASS</a>
        <div class="nav-links">
          <a href="/home">Home</a>
          <a href="/tickets">Tickets</a>
          <a href="/contactus">Contact Us</a>
          <a href="/profile">Profile</a>
        </div>
        <a href="#" onclick="localStorage.clear(); window.location.href='/';" class="nav-cta">Sign out</a>
      </div>
    </nav>
  `;
}

