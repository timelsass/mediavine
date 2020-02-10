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
	var $main = document.getElementById( 'main' );
	
	var elHeight = $el.offsetHeight;
	var elWidth = $el.offsetWidth;

	function adjustWindowSize() {
		scale = Math.min(
			parseFloat( getComputedStyle( $main, null ).width.replace( 'px', '' ) ) / elWidth,    
			parseFloat( getComputedStyle( $main, null ).height.replace( 'px', '' ) )  / elHeight
		);

		scale = scale > 1 ? 1 : scale;

		$el.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
	}

	adjustWindowSize();
	window.addEventListener( 'resize', adjustWindowSize );
} )();
