( function() {
	var menu = document.querySelector( '.menu' ),
			toggle = document.querySelector( '.menu-toggle-wrapper' );

	function toggleToggle() {
		toggle.querySelector( '.menu-toggle' ).classList.toggle( 'menu-open' );
	};

	function toggleMenu() {
		menu.classList.toggle( 'active' );
	};

	toggle.addEventListener( 'click', toggleToggle, false );
	toggle.addEventListener( 'click', toggleMenu, false );

	var $el = document.querySelector( '.resizable' );
	var elHeight = $el.clientHeight;
	var elWidth = $el.offsetWidth;

	function adjustWindowSize() {
		scale = Math.min(
			document.body.offsetWidth / elWidth,    
			document.body.clientHeight / elHeight
		);

		scale = scale > 1 ? 1 : scale;

		$el.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
	}

	adjustWindowSize();
	window.addEventListener( 'resize', adjustWindowSize );
} )();
