import { gql } from "@apollo/client";

export const ALL_CLASSSES = gql`
  fragment ClassFragment on Class {
    key: id
    title: name
    description
  }
  
  fragment ChildrenRecursive on Tree {
    key: id
    title: name
    description
    classTypes {
      id
      name
      description
      sort
      standard
      code
    }
    children {
      ...ClassFragment
      children {
        ...ClassFragment
        children {
          ...ClassFragment
        }
      }
    }
  }
  
  query AllClasses {
    modelTreeClasses {
      searched
      tree {
        ...ChildrenRecursive
      }
    }
  }
`