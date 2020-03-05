/**
 * WordPress dependencies
 */
import { BlockInspector } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import SettingsHeader from '../settings-header';
import PostStatus from '../post-status';
import LastRevision from '../last-revision';
import PostTaxonomies from '../post-taxonomies';
import FeaturedImage from '../featured-image';
import PostExcerpt from '../post-excerpt';
import PostLink from '../post-link';
import DiscussionPanel from '../discussion-panel';
import PageAttributes from '../page-attributes';
import MetaBoxes from '../../meta-boxes';
import PluginDocumentSettingPanel from '../plugin-document-setting-panel';
import PluginSidebarEditPost from '../../sidebar/plugin-sidebar';

const SettingsSidebar = () => {
	const header = <SettingsHeader />;
	return (
		<>
			<PluginSidebarEditPost
				sidebarName="edit-post/document"
				header={ header }
			>
				<PostStatus />
				<PluginDocumentSettingPanel.Slot />
				<LastRevision />
				<PostLink />
				<PostTaxonomies />
				<FeaturedImage />
				<PostExcerpt />
				<DiscussionPanel />
				<PageAttributes />
				<MetaBoxes location="side" />
			</PluginSidebarEditPost>
			<PluginSidebarEditPost
				sidebarName="edit-post/block"
				header={ header }
			>
				<BlockInspector />
			</PluginSidebarEditPost>
		</>
	);
};

export default SettingsSidebar;
