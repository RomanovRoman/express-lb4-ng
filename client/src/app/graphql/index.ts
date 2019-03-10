export type Maybe<T> = T | null;

export interface FilterInput {
  fields?: Maybe<FieldsInput>;

  limit?: Maybe<number>;

  offset?: Maybe<number>;

  order?: Maybe<(Maybe<string>)[]>;

  skip?: Maybe<number>;

  where?: Maybe<string>;
}

export interface FieldsInput {
  desc?: Maybe<boolean>;

  id?: Maybe<boolean>;

  isComplete?: Maybe<boolean>;

  title?: Maybe<boolean>;
}

export interface TodoInput {
  desc?: Maybe<string>;

  id?: Maybe<number>;

  isComplete?: Maybe<boolean>;

  title: string;
}

// ====================================================
// Documents
// ====================================================

export namespace Todos3 {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    todos3: Maybe<(Maybe<Todos3>)[]>;
  };

  export type Todos3 = {
    __typename?: 'Todo';

    id: Maybe<number>;

    title: Maybe<string>;

    desc: Maybe<string>;

    isComplete: Maybe<boolean>;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import {Injectable} from '@angular/core';
import * as Apollo from 'apollo-angular';

import gql from 'graphql-tag';

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: 'root',
})
export class Todos3GQL extends Apollo.Query<Todos3.Query, Todos3.Variables> {
  document: any = gql`
    query todos3 {
      todos3 {
        id
        title
        desc
        isComplete
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
