/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * WordPress dependencies
 */
import { Button, Panel, Slot, Fill } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { withPluginContext } from '@wordpress/plugins';
import { starEmpty, starFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
//import PinnedPlugins from '../../header/pinned-plugins';
import PluginComplementaryAreaHeader from './plugin-complementary-area-header';
import PinnedItems from '../pinned-items';

function PluginComplementaryAreaSlot( { scope, ...props } ) {
	return <Slot name={ `PluginComplementaryArea/${ scope }` } { ...props } />;
}

function PluginComplementaryAreaFill( { scope, ...props } ) {
	return <Fill name={ `PluginComplementaryArea/${ scope }` } { ...props } />;
}

function PluginComplementaryArea( {
	sidebarName,
	children,
	className,
	icon,
	isPinnable = true,
	title,
	scope,
	header,
	smallScreenTitle,
	closeLabel,
	...props
} ) {
	const { isActive, isPinned } = useSelect(
		( select ) => {
			const { getSingleActiveArea, isMultipleActiveAreaActive } = select(
				'core/admin-screen'
			);
			return {
				isActive: getSingleActiveArea( scope ) === sidebarName,
				isPinned: isMultipleActiveAreaActive( scope, sidebarName ),
			};
		},
		[ sidebarName, scope ]
	);
	const { setSingleActiveArea } = useDispatch( 'core/admin-screen' );
	const { setMultipleActiveAreaEnableState } = useDispatch(
		'core/admin-screen'
	);
	return (
		<>
			{ isPinned && (
				<PinnedItems scope={ scope }>
					<Button
						icon={ icon }
						label={ title }
						onClick={ () =>
							isActive
								? setSingleActiveArea( scope )
								: setSingleActiveArea( scope, sidebarName )
						}
						isPressed={ isActive }
						aria-expanded={ isActive }
					/>
				</PinnedItems>
			) }
			{ isActive && (
				<PluginComplementaryAreaFill
					scope={ scope }
					{ ...omit( props, [ 'name' ] ) }
				>
					<PluginComplementaryAreaHeader
						closeLabel={ closeLabel || __( 'Close plugin' ) }
						closeSidebar={ () => setSingleActiveArea( scope ) }
						smallScreenTitle={ smallScreenTitle }
					>
						{ header || (
							<>
								<strong>{ title }</strong>
								{ isPinnable && (
									<Button
										icon={
											isPinned ? starFilled : starEmpty
										}
										label={
											isPinned
												? __( 'Unpin from toolbar' )
												: __( 'Pin to toolbar' )
										}
										onClick={ () =>
											setMultipleActiveAreaEnableState(
												scope,
												sidebarName,
												! isPinned
											)
										}
										isPressed={ isPinned }
										aria-expanded={ isPinned }
									/>
								) }
							</>
						) }
					</PluginComplementaryAreaHeader>
					<Panel className={ className }>{ children }</Panel>
				</PluginComplementaryAreaFill>
			) }
		</>
	);
}

const PluginComplementaryAreaWrapped = withPluginContext(
	( context, ownProps ) => {
		return {
			icon: ownProps.icon || context.icon,
			sidebarName:
				ownProps.sidebarName || `${ context.name }/${ ownProps.name }`,
		};
	}
)( PluginComplementaryArea );

PluginComplementaryAreaWrapped.Slot = PluginComplementaryAreaSlot;

export default PluginComplementaryAreaWrapped;
