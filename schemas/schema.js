// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: 'author',
      type: 'document',
      title: 'Author',
      fields:[
        {
          name: 'name',
          type: 'string',
          title: 'Name'
        },
        {
          name: 'avatar',
          type: 'image',
          title: 'Avatar'
        },
      ]
    },
    {
      name: 'blog',
      type: 'document',
      title: 'Blog',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: Rule =>[
            Rule.required().min(10).error('A title with minimun 5 characters is required'),
            Rule.max(35).error("Shorter titles look better ")
          ] 
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle',
          validation: Rule => Rule.required().min(5).max(35)
        },
        {
          name: 'coverImage',
          type: 'image',
          title: 'Cover Image',
          // To allow cropping the images
          options:{
            hotspot: true
          },
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Description',
            }
          ],
          validation: Rule => Rule.required()
        },
        {
          name: 'content',
          type: 'array',
          title: 'content',
          of: [
            {
              type: 'block'
            },
            {
              type: 'image',
              fields: [
                {
                  title: 'Position',
                  name: 'position',  
                  type: 'string',
                  // options is to provide configurations
                  options:{
                    list:[
                      {title: 'Center', value: 'center'}, 
                      {title: 'Left', value: 'left'}, 
                      {title: 'Right', value: 'right'}, 
                    ],
                    layout: 'radio',
                    isHighlighted: true
                  }
                },
                {
                  type: 'text',
                  name: 'alt',
                  title: 'Description',
                  options: { //Will add the rich text editor
                    isHighlighted: true
                  }
                }
              ],
              options:{
                // For cropping the image to pick the section of the image to be always in focus, when displaying on the app
                hotspot: true
              }
            },
            {
              type: 'code',
              options:{
                withFileName: true
              }
            }
          ],
          validation: Rule => Rule.required()
        },
        {
          name: 'date',
          type: 'datetime',
          title: 'Date',
          validation: Rule => Rule.required()
        },
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{ type: 'author' }],
          validation: Rule => Rule.required()
        },
        {
          name: 'slug',
          type: 'string',
          title: 'Slug',
          validation: Rule => Rule.required()
        },
      ]
    }
  ]),
})
