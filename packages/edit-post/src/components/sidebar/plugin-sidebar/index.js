/**
 * WordPress dependencies
 */
import { PluginSidebar } from '@wordpress/admin-screen';
import { useSelect } from '@wordpress/data';

export default function PluginSidebarEditPost( { ...props } ) {
	const postTitle = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'title' );
	} );
	return (
		<PluginSidebar
			smallScreenTitle={ postTitle }
			scope="edit-post/sidebar"
			{ ...props }
		/>
	);
}
