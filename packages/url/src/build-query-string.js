export function buildQueryString( data ) {
	let string = '';

	const stack = Array.from( Object.entries( data ) );

	let pair;
	while ( ( pair = stack.shift() ) ) {
		let [ key, value ] = pair;
		if (
			value &&
			( Array.isArray( value ) || value.constructor === Object )
		) {
			for ( const [ member, memberValue ] of Object.entries(
				value
			).reverse() ) {
				/** @type {Array<[string|string[],any]>} */ ( stack ).unshift( [
					[ key, member ],
					memberValue,
				] );
			}
		} else if ( value !== undefined ) {
			if ( string ) {
				string += '&';
			}

			if ( Array.isArray( key ) ) {
				key = key.map( encodeURIComponent ).join( '[' ) + ']';
			} else {
				key = encodeURIComponent( key );
			}

			string += key;

			if ( value !== '' ) {
				string += '=' + encodeURIComponent( value );
			}
		}
	}

	return string;
}
