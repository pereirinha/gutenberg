/**
 * Internal dependencies
 */
import { getQueryString } from './get-query-string';

const REGEXP_KEY_MEMBER = /(.+)\[([^\]]*)\]$/;

export function getQueryArgs( url ) {
	return ( getQueryString( url ) || '' )
		.replace( /\+/g, '%20' )
		.split( '&' )
		.reduce( ( accumulator, keyValue ) => {
			let [ key, value = '' ] = keyValue
				.split( '=' )
				.filter( Boolean )
				.map( decodeURIComponent );

			if ( key ) {
				const memberMatch = key.match( REGEXP_KEY_MEMBER );
				if ( memberMatch ) {
					key = memberMatch[ 1 ];
					const member = memberMatch[ 2 ];
					if ( ! accumulator[ key ] ) {
						accumulator[ key ] =
							member && isNaN( Number( member ) ) ? {} : [];
					}
					if ( Array.isArray( accumulator[ key ] ) && ! member ) {
						accumulator[ key ].push( value );
					} else {
						accumulator[ key ][ member ] = value;
					}
				} else {
					accumulator[ key ] = value;
				}
			}

			return accumulator;
		}, {} );
}
