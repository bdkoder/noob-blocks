import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';
import classNames from 'classnames';
import { 
	TabPanel, 
	SelectControl, 
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,

 } from '@wordpress/components';
export default function Edit({ clientId, attributes, setAttributes }) {

	const blockProps = useBlockProps({
		className: classNames('noob-blocks-heading', clientId),
	});

	return (
		<>
		<InspectorControls>
				<TabPanel
					onSelect={(tabName) => console.log(tabName)}
					tabs={[
						{
							name: 'content',
							title: 'Content'
						},
						{
							name: 'style',
							title: 'Style'
						}
					]}
				>
					{
						(tab) => {
							if (tab.name === 'content') {
								return (
									<>
										<PanelBody title="Content">
											<SelectControl
												label={__('Select Heading Tag', 'noob-blocks')}
												value={attributes?.htmlTag}
												options={[
													{ label: 'H1', value: 'h1' },
													{ label: 'H2', value: 'h2' },
													{ label: 'H3', value: 'h3' },
													{ label: 'H4', value: 'h4' },
													{ label: 'H5', value: 'h5' },
													{ label: 'H6', value: 'h6' },
												]}
												onChange={(value) => setAttributes({ htmlTag: value })}
											/>
										</PanelBody>
									</>
								);
							}
							if (tab.name === 'style') {
								return (
									<PanelBody title="Heading">
										<ToggleGroupControl
											label="Alignment"
											value={attributes?.alignment}
											isBlock
											__nextHasNoMarginBottom
										>
											<ToggleGroupControlOption value="left" label="Left" />
											<ToggleGroupControlOption value="center" label="Center" />
											<ToggleGroupControlOption value="right" label="Right" />
										</ToggleGroupControl>
									</PanelBody>
								);
							}
						}
					}
				</TabPanel>
		</InspectorControls>
			<div {...blockProps}>
				<RichText
					tagName={attributes?.htmlTag}
					value={attributes.content}
					onChange={(content) => setAttributes({ content })}
					placeholder={__('Heading', 'noob-blocks')}
				/>
			</div>
		</>
	);

}

