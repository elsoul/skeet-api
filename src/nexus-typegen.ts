/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core, connectionPluginCore } from "nexus"
import type { RelayGlobalIdNexusFieldConfig } from "@jcm/nexus-plugin-relay-global-id"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName> & { totalCount?: connectionPluginCore.ConnectionFieldResolver<TypeName, FieldName, "totalCount"> }
    ): void
    relayGlobalId<FieldName extends string>(
            fieldName: FieldName, 
            config: RelayGlobalIdNexusFieldConfig<TypeName, FieldName>
          ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: Date
}

export interface NexusGenObjects {
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Query: {};
  QueryUsersConnection_Connection: { // root type
    edges?: Array<NexusGenRootTypes['UserEdge'] | null> | null; // [UserEdge]
    nodes?: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  User: { // root type
    name: string; // String!
  }
  UserEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['User'] | null; // User
  }
}

export interface NexusGenInterfaces {
  Node: any;
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteUser: NexusGenRootTypes['User'] | null; // User
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    dailyTask: boolean | null; // Boolean
    getUser: NexusGenRootTypes['User'] | null; // User
    node: NexusGenRootTypes['Node'] | null; // Node
    nodes: Array<NexusGenRootTypes['Node'] | null>; // [Node]!
    postTweet: boolean | null; // Boolean
    usersConnection: NexusGenRootTypes['QueryUsersConnection_Connection'] | null; // QueryUsersConnection_Connection
  }
  QueryUsersConnection_Connection: { // field return type
    edges: Array<NexusGenRootTypes['UserEdge'] | null> | null; // [UserEdge]
    nodes: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  }
  User: { // field return type
    id: string | null; // ID
    name: string; // String!
    rawId: string | null; // ID
  }
  UserEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['User'] | null; // User
  }
  Node: { // field return type
    id: string | null; // ID
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createUser: 'User'
    deleteUser: 'User'
    updateUser: 'User'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    dailyTask: 'Boolean'
    getUser: 'User'
    node: 'Node'
    nodes: 'Node'
    postTweet: 'Boolean'
    usersConnection: 'QueryUsersConnection_Connection'
  }
  QueryUsersConnection_Connection: { // field return type name
    edges: 'UserEdge'
    nodes: 'User'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  User: { // field return type name
    id: 'ID'
    name: 'String'
    rawId: 'ID'
  }
  UserEdge: { // field return type name
    cursor: 'String'
    node: 'User'
  }
  Node: { // field return type name
    id: 'ID'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      name?: string | null; // String
    }
    deleteUser: { // args
      id: string; // String!
    }
    updateUser: { // args
      id: string; // String!
      name?: string | null; // String
    }
  }
  Query: {
    dailyTask: { // args
      id: string; // String!
    }
    getUser: { // args
      id: string; // String!
    }
    node: { // args
      id: string; // ID!
    }
    nodes: { // args
      ids: string[]; // [ID!]!
    }
    postTweet: { // args
      id: string; // String!
      text: string; // String!
    }
    usersConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "Node";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}