export default {
    "scalars": [
        1,
        3,
        4,
        6,
        8,
        11,
        12,
        14,
        15,
        18,
        21,
        22,
        23,
        24,
        34,
        37,
        39,
        50,
        52,
        54,
        57,
        60,
        61,
        62,
        63,
        64,
        66,
        69,
        70,
        75,
        78,
        83,
        86,
        87,
        89,
        93,
        94,
        100,
        114,
        119,
        120,
        121,
        123,
        131,
        146,
        149,
        151,
        155,
        159,
        160,
        166,
        171,
        174,
        178,
        183,
        184,
        186,
        191,
        196,
        197,
        213,
        230,
        247,
        284,
        285,
        295,
        296,
        332,
        333,
        334,
        335,
        337,
        338,
        339,
        340,
        341,
        342,
        343,
        345,
        347,
        355,
        361,
        362,
        363,
        365,
        372,
        379,
        410,
        491,
        496,
        497
    ],
    "types": {
        "BillingProductDTO": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                118
            ],
            "on_BillingLicensedProduct": [
                127
            ],
            "on_BillingMeteredProduct": [
                128
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "ApiKey": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "expiresAt": [
                4
            ],
            "revokedAt": [
                4
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "role": [
                29
            ],
            "__typename": [
                1
            ]
        },
        "UUID": {},
        "DateTime": {},
        "ApplicationRegistrationVariable": {
            "id": [
                3
            ],
            "key": [
                1
            ],
            "description": [
                1
            ],
            "isSecret": [
                6
            ],
            "isRequired": [
                6
            ],
            "isFilled": [
                6
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "Boolean": {},
        "ApplicationRegistration": {
            "id": [
                3
            ],
            "universalIdentifier": [
                1
            ],
            "name": [
                1
            ],
            "oAuthClientId": [
                1
            ],
            "oAuthRedirectUris": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "ownerWorkspaceId": [
                3
            ],
            "sourceType": [
                8
            ],
            "sourcePackage": [
                1
            ],
            "latestAvailableVersion": [
                1
            ],
            "isListed": [
                6
            ],
            "isFeatured": [
                6
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "logoUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationRegistrationSourceType": {},
        "TwoFactorAuthenticationMethodSummary": {
            "twoFactorAuthenticationMethodId": [
                3
            ],
            "status": [
                1
            ],
            "strategy": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateGroup": {
            "id": [
                1
            ],
            "parentRowLevelPermissionPredicateGroupId": [
                1
            ],
            "logicalOperator": [
                12
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                11
            ],
            "roleId": [
                1
            ],
            "objectMetadataId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Float": {},
        "RowLevelPermissionPredicateGroupLogicalOperator": {},
        "RowLevelPermissionPredicate": {
            "id": [
                1
            ],
            "fieldMetadataId": [
                1
            ],
            "objectMetadataId": [
                1
            ],
            "operand": [
                14
            ],
            "subFieldName": [
                1
            ],
            "workspaceMemberFieldMetadataId": [
                1
            ],
            "workspaceMemberSubFieldName": [
                1
            ],
            "rowLevelPermissionPredicateGroupId": [
                1
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                11
            ],
            "roleId": [
                1
            ],
            "value": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateOperand": {},
        "JSON": {},
        "ObjectPermission": {
            "objectMetadataId": [
                3
            ],
            "canReadObjectRecords": [
                6
            ],
            "canUpdateObjectRecords": [
                6
            ],
            "canSoftDeleteObjectRecords": [
                6
            ],
            "canDestroyObjectRecords": [
                6
            ],
            "restrictedFields": [
                15
            ],
            "rowLevelPermissionPredicates": [
                13
            ],
            "rowLevelPermissionPredicateGroups": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "UserWorkspace": {
            "id": [
                3
            ],
            "user": [
                68
            ],
            "userId": [
                3
            ],
            "locale": [
                1
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "permissionFlags": [
                18
            ],
            "objectPermissions": [
                16
            ],
            "objectsPermissions": [
                16
            ],
            "twoFactorAuthenticationMethodSummary": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "PermissionFlagType": {},
        "FullName": {
            "firstName": [
                1
            ],
            "lastName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMember": {
            "id": [
                3
            ],
            "name": [
                19
            ],
            "userEmail": [
                1
            ],
            "colorScheme": [
                1
            ],
            "avatarUrl": [
                1
            ],
            "locale": [
                1
            ],
            "calendarStartDay": [
                21
            ],
            "timeZone": [
                1
            ],
            "dateFormat": [
                22
            ],
            "timeFormat": [
                23
            ],
            "roles": [
                29
            ],
            "userWorkspaceId": [
                3
            ],
            "numberFormat": [
                24
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "WorkspaceMemberDateFormatEnum": {},
        "WorkspaceMemberTimeFormatEnum": {},
        "WorkspaceMemberNumberFormatEnum": {},
        "Agent": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "description": [
                1
            ],
            "prompt": [
                1
            ],
            "modelId": [
                1
            ],
            "responseFormat": [
                15
            ],
            "roleId": [
                3
            ],
            "isCustom": [
                6
            ],
            "applicationId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "modelConfiguration": [
                15
            ],
            "evaluationInputs": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FieldPermission": {
            "id": [
                3
            ],
            "objectMetadataId": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "roleId": [
                3
            ],
            "canReadFieldValue": [
                6
            ],
            "canUpdateFieldValue": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "PermissionFlag": {
            "id": [
                3
            ],
            "roleId": [
                3
            ],
            "flag": [
                18
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyForRole": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "expiresAt": [
                4
            ],
            "revokedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "Role": {
            "id": [
                3
            ],
            "universalIdentifier": [
                3
            ],
            "label": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "isEditable": [
                6
            ],
            "canBeAssignedToUsers": [
                6
            ],
            "canBeAssignedToAgents": [
                6
            ],
            "canBeAssignedToApiKeys": [
                6
            ],
            "workspaceMembers": [
                20
            ],
            "agents": [
                25
            ],
            "apiKeys": [
                28
            ],
            "canUpdateAllSettings": [
                6
            ],
            "canAccessAllTools": [
                6
            ],
            "canReadAllObjectRecords": [
                6
            ],
            "canUpdateAllObjectRecords": [
                6
            ],
            "canSoftDeleteAllObjectRecords": [
                6
            ],
            "canDestroyAllObjectRecords": [
                6
            ],
            "permissionFlags": [
                27
            ],
            "objectPermissions": [
                16
            ],
            "fieldPermissions": [
                26
            ],
            "rowLevelPermissionPredicates": [
                13
            ],
            "rowLevelPermissionPredicateGroups": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationVariable": {
            "id": [
                3
            ],
            "key": [
                1
            ],
            "value": [
                1
            ],
            "description": [
                1
            ],
            "isSecret": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunction": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "runtime": [
                1
            ],
            "timeoutSeconds": [
                11
            ],
            "sourceHandlerPath": [
                1
            ],
            "handlerName": [
                1
            ],
            "toolInputSchema": [
                15
            ],
            "isTool": [
                6
            ],
            "cronTriggerSettings": [
                15
            ],
            "databaseEventTriggerSettings": [
                15
            ],
            "httpRouteTriggerSettings": [
                15
            ],
            "applicationId": [
                3
            ],
            "universalIdentifier": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "StandardOverrides": {
            "label": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "translations": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "Field": {
            "id": [
                3
            ],
            "universalIdentifier": [
                1
            ],
            "type": [
                34
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "standardOverrides": [
                32
            ],
            "isCustom": [
                6
            ],
            "isActive": [
                6
            ],
            "isSystem": [
                6
            ],
            "isUIReadOnly": [
                6
            ],
            "isNullable": [
                6
            ],
            "isUnique": [
                6
            ],
            "defaultValue": [
                15
            ],
            "options": [
                15
            ],
            "settings": [
                15
            ],
            "objectMetadataId": [
                3
            ],
            "isLabelSyncedWithName": [
                6
            ],
            "morphId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "applicationId": [
                3
            ],
            "relation": [
                246
            ],
            "morphRelations": [
                246
            ],
            "object": [
                45
            ],
            "__typename": [
                1
            ]
        },
        "FieldMetadataType": {},
        "IndexField": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "order": [
                11
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "Index": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "isCustom": [
                6
            ],
            "isUnique": [
                6
            ],
            "indexWhereClause": [
                1
            ],
            "indexType": [
                37
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "indexFieldMetadataList": [
                35
            ],
            "objectMetadata": [
                239,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        40,
                        "ObjectFilter!"
                    ]
                }
            ],
            "indexFieldMetadatas": [
                237,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        43,
                        "IndexFieldFilter!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "IndexType": {},
        "CursorPaging": {
            "before": [
                39
            ],
            "after": [
                39
            ],
            "first": [
                21
            ],
            "last": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "ConnectionCursor": {},
        "ObjectFilter": {
            "and": [
                40
            ],
            "or": [
                40
            ],
            "id": [
                41
            ],
            "isCustom": [
                42
            ],
            "isRemote": [
                42
            ],
            "isActive": [
                42
            ],
            "isSystem": [
                42
            ],
            "isUIReadOnly": [
                42
            ],
            "isSearchable": [
                42
            ],
            "__typename": [
                1
            ]
        },
        "UUIDFilterComparison": {
            "is": [
                6
            ],
            "isNot": [
                6
            ],
            "eq": [
                3
            ],
            "neq": [
                3
            ],
            "gt": [
                3
            ],
            "gte": [
                3
            ],
            "lt": [
                3
            ],
            "lte": [
                3
            ],
            "like": [
                3
            ],
            "notLike": [
                3
            ],
            "iLike": [
                3
            ],
            "notILike": [
                3
            ],
            "in": [
                3
            ],
            "notIn": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "BooleanFieldComparison": {
            "is": [
                6
            ],
            "isNot": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "IndexFieldFilter": {
            "and": [
                43
            ],
            "or": [
                43
            ],
            "id": [
                41
            ],
            "fieldMetadataId": [
                41
            ],
            "__typename": [
                1
            ]
        },
        "ObjectStandardOverrides": {
            "labelSingular": [
                1
            ],
            "labelPlural": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "color": [
                1
            ],
            "translations": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "Object": {
            "id": [
                3
            ],
            "universalIdentifier": [
                1
            ],
            "nameSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "labelPlural": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "standardOverrides": [
                44
            ],
            "shortcut": [
                1
            ],
            "color": [
                1
            ],
            "isCustom": [
                6
            ],
            "isRemote": [
                6
            ],
            "isActive": [
                6
            ],
            "isSystem": [
                6
            ],
            "isUIReadOnly": [
                6
            ],
            "isSearchable": [
                6
            ],
            "applicationId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "labelIdentifierFieldMetadataId": [
                3
            ],
            "imageIdentifierFieldMetadataId": [
                3
            ],
            "isLabelSyncedWithName": [
                6
            ],
            "duplicateCriteria": [
                1
            ],
            "fieldsList": [
                33
            ],
            "indexMetadataList": [
                36
            ],
            "fields": [
                244,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        46,
                        "FieldFilter!"
                    ]
                }
            ],
            "indexMetadatas": [
                242,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        47,
                        "IndexFilter!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "FieldFilter": {
            "and": [
                46
            ],
            "or": [
                46
            ],
            "id": [
                41
            ],
            "isCustom": [
                42
            ],
            "isActive": [
                42
            ],
            "isSystem": [
                42
            ],
            "isUIReadOnly": [
                42
            ],
            "objectMetadataId": [
                41
            ],
            "__typename": [
                1
            ]
        },
        "IndexFilter": {
            "and": [
                47
            ],
            "or": [
                47
            ],
            "id": [
                41
            ],
            "isCustom": [
                42
            ],
            "__typename": [
                1
            ]
        },
        "Application": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "version": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "packageJsonChecksum": [
                1
            ],
            "packageJsonFileId": [
                3
            ],
            "yarnLockChecksum": [
                1
            ],
            "yarnLockFileId": [
                3
            ],
            "availablePackages": [
                15
            ],
            "applicationRegistrationId": [
                3
            ],
            "canBeUninstalled": [
                6
            ],
            "defaultRoleId": [
                1
            ],
            "settingsCustomTabFrontComponentId": [
                3
            ],
            "defaultLogicFunctionRole": [
                29
            ],
            "agents": [
                25
            ],
            "logicFunctions": [
                31
            ],
            "objects": [
                45
            ],
            "applicationVariables": [
                30
            ],
            "applicationRegistration": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "ViewField": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "isVisible": [
                6
            ],
            "size": [
                11
            ],
            "position": [
                11
            ],
            "aggregateOperation": [
                50
            ],
            "viewId": [
                3
            ],
            "viewFieldGroupId": [
                3
            ],
            "workspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "isOverridden": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "AggregateOperations": {},
        "ViewFilterGroup": {
            "id": [
                3
            ],
            "parentViewFilterGroupId": [
                3
            ],
            "logicalOperator": [
                52
            ],
            "positionInViewFilterGroup": [
                11
            ],
            "viewId": [
                3
            ],
            "workspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ViewFilterGroupLogicalOperator": {},
        "ViewFilter": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "operand": [
                54
            ],
            "value": [
                15
            ],
            "viewFilterGroupId": [
                3
            ],
            "positionInViewFilterGroup": [
                11
            ],
            "subFieldName": [
                1
            ],
            "viewId": [
                3
            ],
            "workspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ViewFilterOperand": {},
        "ViewGroup": {
            "id": [
                3
            ],
            "isVisible": [
                6
            ],
            "fieldValue": [
                1
            ],
            "position": [
                11
            ],
            "viewId": [
                3
            ],
            "workspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ViewSort": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "direction": [
                57
            ],
            "viewId": [
                3
            ],
            "workspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ViewSortDirection": {},
        "ViewFieldGroup": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "position": [
                11
            ],
            "isVisible": [
                6
            ],
            "viewId": [
                3
            ],
            "workspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "viewFields": [
                49
            ],
            "isOverridden": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "View": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                3
            ],
            "type": [
                60
            ],
            "key": [
                61
            ],
            "icon": [
                1
            ],
            "position": [
                11
            ],
            "isCompact": [
                6
            ],
            "isCustom": [
                6
            ],
            "openRecordIn": [
                62
            ],
            "kanbanAggregateOperation": [
                50
            ],
            "kanbanAggregateOperationFieldMetadataId": [
                3
            ],
            "mainGroupByFieldMetadataId": [
                3
            ],
            "shouldHideEmptyGroups": [
                6
            ],
            "calendarFieldMetadataId": [
                3
            ],
            "workspaceId": [
                3
            ],
            "anyFieldFilterValue": [
                1
            ],
            "calendarLayout": [
                63
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "viewFields": [
                49
            ],
            "viewFilters": [
                53
            ],
            "viewFilterGroups": [
                51
            ],
            "viewSorts": [
                56
            ],
            "viewGroups": [
                55
            ],
            "viewFieldGroups": [
                58
            ],
            "visibility": [
                64
            ],
            "createdByUserWorkspaceId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "ViewType": {},
        "ViewKey": {},
        "ViewOpenRecordIn": {},
        "ViewCalendarLayout": {},
        "ViewVisibility": {},
        "Workspace": {
            "id": [
                3
            ],
            "displayName": [
                1
            ],
            "logo": [
                1
            ],
            "logoFileId": [
                3
            ],
            "inviteHash": [
                1
            ],
            "deletedAt": [
                4
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "allowImpersonation": [
                6
            ],
            "isPublicInviteLinkEnabled": [
                6
            ],
            "trashRetentionDays": [
                11
            ],
            "eventLogRetentionDays": [
                11
            ],
            "workspaceMembersCount": [
                11
            ],
            "activationStatus": [
                66
            ],
            "views": [
                59
            ],
            "viewFields": [
                49
            ],
            "viewFilters": [
                53
            ],
            "viewFilterGroups": [
                51
            ],
            "viewGroups": [
                55
            ],
            "viewSorts": [
                56
            ],
            "metadataVersion": [
                11
            ],
            "databaseSchema": [
                1
            ],
            "subdomain": [
                1
            ],
            "customDomain": [
                1
            ],
            "isGoogleAuthEnabled": [
                6
            ],
            "isGoogleAuthBypassEnabled": [
                6
            ],
            "isTwoFactorAuthenticationEnforced": [
                6
            ],
            "isPasswordAuthEnabled": [
                6
            ],
            "isPasswordAuthBypassEnabled": [
                6
            ],
            "isMicrosoftAuthEnabled": [
                6
            ],
            "isMicrosoftAuthBypassEnabled": [
                6
            ],
            "isCustomDomainEnabled": [
                6
            ],
            "editableProfileFields": [
                1
            ],
            "defaultRole": [
                29
            ],
            "version": [
                1
            ],
            "fastModel": [
                1
            ],
            "smartModel": [
                1
            ],
            "aiAdditionalInstructions": [
                1
            ],
            "enabledAiModelIds": [
                1
            ],
            "useRecommendedModels": [
                6
            ],
            "routerModel": [
                1
            ],
            "workspaceCustomApplication": [
                48
            ],
            "featureFlags": [
                199
            ],
            "billingSubscriptions": [
                130
            ],
            "currentBillingSubscription": [
                130
            ],
            "billingEntitlements": [
                229
            ],
            "hasValidEnterpriseKey": [
                6
            ],
            "hasValidSignedEnterpriseKey": [
                6
            ],
            "hasValidEnterpriseValidityToken": [
                6
            ],
            "workspaceUrls": [
                157
            ],
            "workspaceCustomApplicationId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceActivationStatus": {},
        "AppToken": {
            "id": [
                3
            ],
            "type": [
                1
            ],
            "expiresAt": [
                4
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "User": {
            "id": [
                3
            ],
            "firstName": [
                1
            ],
            "lastName": [
                1
            ],
            "email": [
                1
            ],
            "defaultAvatarUrl": [
                1
            ],
            "isEmailVerified": [
                6
            ],
            "disabled": [
                6
            ],
            "canImpersonate": [
                6
            ],
            "canAccessFullAdminPanel": [
                6
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "locale": [
                1
            ],
            "workspaceMember": [
                20
            ],
            "userWorkspaces": [
                17
            ],
            "onboardingStatus": [
                69
            ],
            "currentWorkspace": [
                65
            ],
            "currentUserWorkspace": [
                17
            ],
            "userVars": [
                70
            ],
            "workspaceMembers": [
                20
            ],
            "deletedWorkspaceMembers": [
                228
            ],
            "hasPassword": [
                6
            ],
            "supportUserHash": [
                1
            ],
            "workspaces": [
                17
            ],
            "availableWorkspaces": [
                227
            ],
            "__typename": [
                1
            ]
        },
        "OnboardingStatus": {},
        "JSONObject": {},
        "RatioAggregateConfig": {
            "fieldMetadataId": [
                3
            ],
            "optionValue": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RichTextBody": {
            "blocknote": [
                1
            ],
            "markdown": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "GridPosition": {
            "row": [
                11
            ],
            "column": [
                11
            ],
            "rowSpan": [
                11
            ],
            "columnSpan": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutWidget": {
            "id": [
                3
            ],
            "pageLayoutTabId": [
                3
            ],
            "title": [
                1
            ],
            "type": [
                75
            ],
            "objectMetadataId": [
                3
            ],
            "gridPosition": [
                73
            ],
            "position": [
                76
            ],
            "configuration": [
                81
            ],
            "conditionalDisplay": [
                15
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "isOverridden": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "WidgetType": {},
        "PageLayoutWidgetPosition": {
            "on_PageLayoutWidgetGridPosition": [
                77
            ],
            "on_PageLayoutWidgetVerticalListPosition": [
                79
            ],
            "on_PageLayoutWidgetCanvasPosition": [
                80
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutWidgetGridPosition": {
            "layoutMode": [
                78
            ],
            "row": [
                21
            ],
            "column": [
                21
            ],
            "rowSpan": [
                21
            ],
            "columnSpan": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutTabLayoutMode": {},
        "PageLayoutWidgetVerticalListPosition": {
            "layoutMode": [
                78
            ],
            "index": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutWidgetCanvasPosition": {
            "layoutMode": [
                78
            ],
            "__typename": [
                1
            ]
        },
        "WidgetConfiguration": {
            "on_AggregateChartConfiguration": [
                82
            ],
            "on_StandaloneRichTextConfiguration": [
                84
            ],
            "on_PieChartConfiguration": [
                85
            ],
            "on_LineChartConfiguration": [
                88
            ],
            "on_IframeConfiguration": [
                90
            ],
            "on_GaugeChartConfiguration": [
                91
            ],
            "on_BarChartConfiguration": [
                92
            ],
            "on_CalendarConfiguration": [
                95
            ],
            "on_FrontComponentConfiguration": [
                96
            ],
            "on_EmailsConfiguration": [
                97
            ],
            "on_EmailThreadConfiguration": [
                98
            ],
            "on_FieldConfiguration": [
                99
            ],
            "on_FieldRichTextConfiguration": [
                101
            ],
            "on_FieldsConfiguration": [
                102
            ],
            "on_FilesConfiguration": [
                103
            ],
            "on_NotesConfiguration": [
                104
            ],
            "on_TasksConfiguration": [
                105
            ],
            "on_TimelineConfiguration": [
                106
            ],
            "on_ViewConfiguration": [
                107
            ],
            "on_RecordTableConfiguration": [
                108
            ],
            "on_WorkflowConfiguration": [
                109
            ],
            "on_WorkflowRunConfiguration": [
                110
            ],
            "on_WorkflowVersionConfiguration": [
                111
            ],
            "__typename": [
                1
            ]
        },
        "AggregateChartConfiguration": {
            "configurationType": [
                83
            ],
            "aggregateFieldMetadataId": [
                3
            ],
            "aggregateOperation": [
                50
            ],
            "label": [
                1
            ],
            "displayDataLabel": [
                6
            ],
            "format": [
                1
            ],
            "description": [
                1
            ],
            "filter": [
                15
            ],
            "timezone": [
                1
            ],
            "firstDayOfTheWeek": [
                21
            ],
            "prefix": [
                1
            ],
            "suffix": [
                1
            ],
            "ratioAggregateConfig": [
                71
            ],
            "__typename": [
                1
            ]
        },
        "WidgetConfigurationType": {},
        "StandaloneRichTextConfiguration": {
            "configurationType": [
                83
            ],
            "body": [
                72
            ],
            "__typename": [
                1
            ]
        },
        "PieChartConfiguration": {
            "configurationType": [
                83
            ],
            "aggregateFieldMetadataId": [
                3
            ],
            "aggregateOperation": [
                50
            ],
            "groupByFieldMetadataId": [
                3
            ],
            "groupBySubFieldName": [
                1
            ],
            "dateGranularity": [
                86
            ],
            "orderBy": [
                87
            ],
            "manualSortOrder": [
                1
            ],
            "displayDataLabel": [
                6
            ],
            "showCenterMetric": [
                6
            ],
            "displayLegend": [
                6
            ],
            "hideEmptyCategory": [
                6
            ],
            "splitMultiValueFields": [
                6
            ],
            "description": [
                1
            ],
            "color": [
                1
            ],
            "filter": [
                15
            ],
            "timezone": [
                1
            ],
            "firstDayOfTheWeek": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "ObjectRecordGroupByDateGranularity": {},
        "GraphOrderBy": {},
        "LineChartConfiguration": {
            "configurationType": [
                83
            ],
            "aggregateFieldMetadataId": [
                3
            ],
            "aggregateOperation": [
                50
            ],
            "primaryAxisGroupByFieldMetadataId": [
                3
            ],
            "primaryAxisGroupBySubFieldName": [
                1
            ],
            "primaryAxisDateGranularity": [
                86
            ],
            "primaryAxisOrderBy": [
                87
            ],
            "primaryAxisManualSortOrder": [
                1
            ],
            "secondaryAxisGroupByFieldMetadataId": [
                3
            ],
            "secondaryAxisGroupBySubFieldName": [
                1
            ],
            "secondaryAxisGroupByDateGranularity": [
                86
            ],
            "secondaryAxisOrderBy": [
                87
            ],
            "secondaryAxisManualSortOrder": [
                1
            ],
            "omitNullValues": [
                6
            ],
            "splitMultiValueFields": [
                6
            ],
            "axisNameDisplay": [
                89
            ],
            "displayDataLabel": [
                6
            ],
            "displayLegend": [
                6
            ],
            "rangeMin": [
                11
            ],
            "rangeMax": [
                11
            ],
            "description": [
                1
            ],
            "color": [
                1
            ],
            "filter": [
                15
            ],
            "isStacked": [
                6
            ],
            "isCumulative": [
                6
            ],
            "timezone": [
                1
            ],
            "firstDayOfTheWeek": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "AxisNameDisplay": {},
        "IframeConfiguration": {
            "configurationType": [
                83
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "GaugeChartConfiguration": {
            "configurationType": [
                83
            ],
            "aggregateFieldMetadataId": [
                3
            ],
            "aggregateOperation": [
                50
            ],
            "displayDataLabel": [
                6
            ],
            "color": [
                1
            ],
            "description": [
                1
            ],
            "filter": [
                15
            ],
            "timezone": [
                1
            ],
            "firstDayOfTheWeek": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "BarChartConfiguration": {
            "configurationType": [
                83
            ],
            "aggregateFieldMetadataId": [
                3
            ],
            "aggregateOperation": [
                50
            ],
            "primaryAxisGroupByFieldMetadataId": [
                3
            ],
            "primaryAxisGroupBySubFieldName": [
                1
            ],
            "primaryAxisDateGranularity": [
                86
            ],
            "primaryAxisOrderBy": [
                87
            ],
            "primaryAxisManualSortOrder": [
                1
            ],
            "secondaryAxisGroupByFieldMetadataId": [
                3
            ],
            "secondaryAxisGroupBySubFieldName": [
                1
            ],
            "secondaryAxisGroupByDateGranularity": [
                86
            ],
            "secondaryAxisOrderBy": [
                87
            ],
            "secondaryAxisManualSortOrder": [
                1
            ],
            "omitNullValues": [
                6
            ],
            "splitMultiValueFields": [
                6
            ],
            "axisNameDisplay": [
                89
            ],
            "displayDataLabel": [
                6
            ],
            "displayLegend": [
                6
            ],
            "rangeMin": [
                11
            ],
            "rangeMax": [
                11
            ],
            "description": [
                1
            ],
            "color": [
                1
            ],
            "filter": [
                15
            ],
            "groupMode": [
                93
            ],
            "layout": [
                94
            ],
            "isCumulative": [
                6
            ],
            "timezone": [
                1
            ],
            "firstDayOfTheWeek": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "BarChartGroupMode": {},
        "BarChartLayout": {},
        "CalendarConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "FrontComponentConfiguration": {
            "configurationType": [
                83
            ],
            "frontComponentId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "EmailsConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "EmailThreadConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "FieldConfiguration": {
            "configurationType": [
                83
            ],
            "fieldMetadataId": [
                1
            ],
            "fieldDisplayMode": [
                100
            ],
            "__typename": [
                1
            ]
        },
        "FieldDisplayMode": {},
        "FieldRichTextConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "FieldsConfiguration": {
            "configurationType": [
                83
            ],
            "viewId": [
                1
            ],
            "newFieldDefaultVisibility": [
                6
            ],
            "shouldAllowUserToSeeHiddenFields": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "FilesConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "NotesConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "TasksConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "TimelineConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "ViewConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "RecordTableConfiguration": {
            "configurationType": [
                83
            ],
            "viewId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkflowConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "WorkflowRunConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "WorkflowVersionConfiguration": {
            "configurationType": [
                83
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutTab": {
            "id": [
                3
            ],
            "applicationId": [
                3
            ],
            "title": [
                1
            ],
            "position": [
                11
            ],
            "pageLayoutId": [
                3
            ],
            "widgets": [
                74
            ],
            "icon": [
                1
            ],
            "layoutMode": [
                78
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "isOverridden": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "PageLayout": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "type": [
                114
            ],
            "objectMetadataId": [
                3
            ],
            "tabs": [
                112
            ],
            "defaultTabToFocusOnMobileAndSidePanelId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "PageLayoutType": {},
        "Analytics": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscriptionSchedulePhaseItem": {
            "price": [
                1
            ],
            "quantity": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscriptionSchedulePhase": {
            "start_date": [
                11
            ],
            "end_date": [
                11
            ],
            "items": [
                116
            ],
            "__typename": [
                1
            ]
        },
        "BillingProductMetadata": {
            "planKey": [
                119
            ],
            "priceUsageBased": [
                120
            ],
            "productKey": [
                121
            ],
            "__typename": [
                1
            ]
        },
        "BillingPlanKey": {},
        "BillingUsageType": {},
        "BillingProductKey": {},
        "BillingPriceLicensed": {
            "recurringInterval": [
                123
            ],
            "unitAmount": [
                11
            ],
            "stripePriceId": [
                1
            ],
            "priceUsageType": [
                120
            ],
            "__typename": [
                1
            ]
        },
        "SubscriptionInterval": {},
        "BillingPriceTier": {
            "upTo": [
                11
            ],
            "flatAmount": [
                11
            ],
            "unitAmount": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "BillingPriceMetered": {
            "tiers": [
                124
            ],
            "recurringInterval": [
                123
            ],
            "stripePriceId": [
                1
            ],
            "priceUsageType": [
                120
            ],
            "__typename": [
                1
            ]
        },
        "BillingProduct": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                118
            ],
            "__typename": [
                1
            ]
        },
        "BillingLicensedProduct": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                118
            ],
            "prices": [
                122
            ],
            "__typename": [
                1
            ]
        },
        "BillingMeteredProduct": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "images": [
                1
            ],
            "metadata": [
                118
            ],
            "prices": [
                125
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscriptionItem": {
            "id": [
                3
            ],
            "hasReachedCurrentPeriodCap": [
                6
            ],
            "quantity": [
                11
            ],
            "stripePriceId": [
                1
            ],
            "billingProduct": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "BillingSubscription": {
            "id": [
                3
            ],
            "status": [
                131
            ],
            "interval": [
                123
            ],
            "billingSubscriptionItems": [
                129
            ],
            "currentPeriodEnd": [
                4
            ],
            "metadata": [
                15
            ],
            "phases": [
                117
            ],
            "__typename": [
                1
            ]
        },
        "SubscriptionStatus": {},
        "BillingEndTrialPeriod": {
            "status": [
                131
            ],
            "hasPaymentMethod": [
                6
            ],
            "billingPortalUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BillingMeteredProductUsage": {
            "productKey": [
                121
            ],
            "periodStart": [
                4
            ],
            "periodEnd": [
                4
            ],
            "usedCredits": [
                11
            ],
            "grantedCredits": [
                11
            ],
            "rolloverCredits": [
                11
            ],
            "totalGrantedCredits": [
                11
            ],
            "unitPriceCents": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "BillingPlan": {
            "planKey": [
                119
            ],
            "licensedProducts": [
                127
            ],
            "meteredProducts": [
                128
            ],
            "__typename": [
                1
            ]
        },
        "BillingSession": {
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BillingUpdate": {
            "currentBillingSubscription": [
                130
            ],
            "billingSubscriptions": [
                130
            ],
            "__typename": [
                1
            ]
        },
        "EnterpriseLicenseInfoDTO": {
            "isValid": [
                6
            ],
            "licensee": [
                1
            ],
            "expiresAt": [
                4
            ],
            "subscriptionId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EnterpriseSubscriptionStatusDTO": {
            "status": [
                1
            ],
            "licensee": [
                1
            ],
            "expiresAt": [
                4
            ],
            "cancelAt": [
                4
            ],
            "currentPeriodEnd": [
                4
            ],
            "isCancellationScheduled": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "OnboardingStepSuccess": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "ApprovedAccessDomain": {
            "id": [
                3
            ],
            "domain": [
                1
            ],
            "isValidated": [
                6
            ],
            "createdAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "FileWithSignedUrl": {
            "id": [
                3
            ],
            "path": [
                1
            ],
            "size": [
                11
            ],
            "createdAt": [
                4
            ],
            "url": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceInvitation": {
            "id": [
                3
            ],
            "email": [
                1
            ],
            "roleId": [
                3
            ],
            "expiresAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "SendInvitations": {
            "success": [
                6
            ],
            "errors": [
                1
            ],
            "result": [
                142
            ],
            "__typename": [
                1
            ]
        },
        "RecordIdentifier": {
            "id": [
                3
            ],
            "labelIdentifier": [
                1
            ],
            "imageIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "NavigationMenuItem": {
            "id": [
                3
            ],
            "userWorkspaceId": [
                3
            ],
            "targetRecordId": [
                3
            ],
            "targetObjectMetadataId": [
                3
            ],
            "viewId": [
                3
            ],
            "type": [
                146
            ],
            "name": [
                1
            ],
            "link": [
                1
            ],
            "icon": [
                1
            ],
            "color": [
                1
            ],
            "folderId": [
                3
            ],
            "position": [
                11
            ],
            "applicationId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "targetRecordIdentifier": [
                144
            ],
            "__typename": [
                1
            ]
        },
        "NavigationMenuItemType": {},
        "ObjectRecordEventProperties": {
            "updatedFields": [
                1
            ],
            "before": [
                15
            ],
            "after": [
                15
            ],
            "diff": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "MetadataEvent": {
            "type": [
                149
            ],
            "metadataName": [
                1
            ],
            "recordId": [
                1
            ],
            "properties": [
                147
            ],
            "updatedCollectionHash": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MetadataEventAction": {},
        "ObjectRecordEvent": {
            "action": [
                151
            ],
            "objectNameSingular": [
                1
            ],
            "recordId": [
                1
            ],
            "userId": [
                1
            ],
            "workspaceMemberId": [
                1
            ],
            "properties": [
                147
            ],
            "__typename": [
                1
            ]
        },
        "DatabaseEventAction": {},
        "ObjectRecordEventWithQueryIds": {
            "queryIds": [
                1
            ],
            "objectRecordEvent": [
                150
            ],
            "__typename": [
                1
            ]
        },
        "EventSubscription": {
            "eventStreamId": [
                1
            ],
            "objectRecordEventsWithQueryIds": [
                152
            ],
            "metadataEvents": [
                148
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionExecutionResult": {
            "data": [
                15
            ],
            "logs": [
                1
            ],
            "duration": [
                11
            ],
            "status": [
                155
            ],
            "error": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionExecutionStatus": {},
        "BillingTrialPeriod": {
            "duration": [
                11
            ],
            "isCreditCardRequired": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceUrls": {
            "customUrl": [
                1
            ],
            "subdomainUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SSOIdentityProvider": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "type": [
                159
            ],
            "status": [
                160
            ],
            "issuer": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "IdentityProviderType": {},
        "SSOIdentityProviderStatus": {},
        "AuthProviders": {
            "sso": [
                158
            ],
            "google": [
                6
            ],
            "magicLink": [
                6
            ],
            "password": [
                6
            ],
            "microsoft": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "AuthBypassProviders": {
            "google": [
                6
            ],
            "password": [
                6
            ],
            "microsoft": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "PublicWorkspaceData": {
            "id": [
                3
            ],
            "authProviders": [
                161
            ],
            "authBypassProviders": [
                162
            ],
            "logo": [
                1
            ],
            "displayName": [
                1
            ],
            "workspaceUrls": [
                157
            ],
            "__typename": [
                1
            ]
        },
        "NativeModelCapabilities": {
            "webSearch": [
                6
            ],
            "twitterSearch": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "ClientAIModelConfig": {
            "modelId": [
                1
            ],
            "label": [
                1
            ],
            "modelFamily": [
                166
            ],
            "modelFamilyLabel": [
                1
            ],
            "sdkPackage": [
                1
            ],
            "inputCostPerMillionTokens": [
                11
            ],
            "outputCostPerMillionTokens": [
                11
            ],
            "nativeCapabilities": [
                164
            ],
            "isDeprecated": [
                6
            ],
            "isRecommended": [
                6
            ],
            "providerName": [
                1
            ],
            "providerLabel": [
                1
            ],
            "contextWindowTokens": [
                11
            ],
            "maxOutputTokens": [
                11
            ],
            "dataResidency": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ModelFamily": {},
        "AdminAIModelConfig": {
            "modelId": [
                1
            ],
            "label": [
                1
            ],
            "modelFamily": [
                166
            ],
            "modelFamilyLabel": [
                1
            ],
            "sdkPackage": [
                1
            ],
            "isAvailable": [
                6
            ],
            "isAdminEnabled": [
                6
            ],
            "isDeprecated": [
                6
            ],
            "isRecommended": [
                6
            ],
            "contextWindowTokens": [
                11
            ],
            "maxOutputTokens": [
                11
            ],
            "inputCostPerMillionTokens": [
                11
            ],
            "outputCostPerMillionTokens": [
                11
            ],
            "providerName": [
                1
            ],
            "providerLabel": [
                1
            ],
            "name": [
                1
            ],
            "dataResidency": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AdminAIModels": {
            "models": [
                167
            ],
            "defaultSmartModelId": [
                1
            ],
            "defaultFastModelId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Billing": {
            "isBillingEnabled": [
                6
            ],
            "billingUrl": [
                1
            ],
            "trialPeriods": [
                156
            ],
            "__typename": [
                1
            ]
        },
        "Support": {
            "supportDriver": [
                171
            ],
            "supportFrontChatId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SupportDriver": {},
        "Sentry": {
            "environment": [
                1
            ],
            "release": [
                1
            ],
            "dsn": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Captcha": {
            "provider": [
                174
            ],
            "siteKey": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CaptchaDriverType": {},
        "ApiConfig": {
            "mutationMaximumAffectedRecords": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "PublicFeatureFlagMetadata": {
            "label": [
                1
            ],
            "description": [
                1
            ],
            "imagePath": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PublicFeatureFlag": {
            "key": [
                178
            ],
            "metadata": [
                176
            ],
            "__typename": [
                1
            ]
        },
        "FeatureFlagKey": {},
        "ClientConfigMaintenanceMode": {
            "startAt": [
                4
            ],
            "endAt": [
                4
            ],
            "link": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ClientConfig": {
            "appVersion": [
                1
            ],
            "authProviders": [
                161
            ],
            "billing": [
                169
            ],
            "aiModels": [
                165
            ],
            "signInPrefilled": [
                6
            ],
            "isMultiWorkspaceEnabled": [
                6
            ],
            "isEmailVerificationRequired": [
                6
            ],
            "defaultSubdomain": [
                1
            ],
            "frontDomain": [
                1
            ],
            "analyticsEnabled": [
                6
            ],
            "support": [
                170
            ],
            "isAttachmentPreviewEnabled": [
                6
            ],
            "sentry": [
                172
            ],
            "captcha": [
                173
            ],
            "api": [
                175
            ],
            "canManageFeatureFlags": [
                6
            ],
            "publicFeatureFlags": [
                177
            ],
            "isMicrosoftMessagingEnabled": [
                6
            ],
            "isMicrosoftCalendarEnabled": [
                6
            ],
            "isGoogleMessagingEnabled": [
                6
            ],
            "isGoogleCalendarEnabled": [
                6
            ],
            "isConfigVariablesInDbEnabled": [
                6
            ],
            "isImapSmtpCaldavEnabled": [
                6
            ],
            "allowRequestsToTwentyIcons": [
                6
            ],
            "calendarBookingPageId": [
                1
            ],
            "isCloudflareIntegrationEnabled": [
                6
            ],
            "isClickHouseConfigured": [
                6
            ],
            "isWorkspaceSchemaDDLLocked": [
                6
            ],
            "maintenance": [
                179
            ],
            "__typename": [
                1
            ]
        },
        "UsageBreakdownItem": {
            "key": [
                1
            ],
            "label": [
                1
            ],
            "creditsUsed": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "ConfigVariable": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "value": [
                15
            ],
            "isSensitive": [
                6
            ],
            "source": [
                183
            ],
            "isEnvOnly": [
                6
            ],
            "type": [
                184
            ],
            "options": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "ConfigSource": {},
        "ConfigVariableType": {},
        "ConfigVariablesGroupData": {
            "variables": [
                182
            ],
            "name": [
                186
            ],
            "description": [
                1
            ],
            "isHiddenOnLoad": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "ConfigVariablesGroup": {},
        "ConfigVariables": {
            "groups": [
                185
            ],
            "__typename": [
                1
            ]
        },
        "JobOperationResult": {
            "jobId": [
                1
            ],
            "success": [
                6
            ],
            "error": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteJobsResponse": {
            "deletedCount": [
                21
            ],
            "results": [
                188
            ],
            "__typename": [
                1
            ]
        },
        "QueueJob": {
            "id": [
                1
            ],
            "name": [
                1
            ],
            "data": [
                15
            ],
            "state": [
                191
            ],
            "timestamp": [
                11
            ],
            "failedReason": [
                1
            ],
            "processedOn": [
                11
            ],
            "finishedOn": [
                11
            ],
            "attemptsMade": [
                11
            ],
            "returnValue": [
                15
            ],
            "logs": [
                1
            ],
            "stackTrace": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "JobState": {},
        "QueueRetentionConfig": {
            "completedMaxAge": [
                11
            ],
            "completedMaxCount": [
                11
            ],
            "failedMaxAge": [
                11
            ],
            "failedMaxCount": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "QueueJobsResponse": {
            "jobs": [
                190
            ],
            "count": [
                11
            ],
            "totalCount": [
                11
            ],
            "hasMore": [
                6
            ],
            "retentionConfig": [
                192
            ],
            "__typename": [
                1
            ]
        },
        "RetryJobsResponse": {
            "retriedCount": [
                21
            ],
            "results": [
                188
            ],
            "__typename": [
                1
            ]
        },
        "SystemHealthService": {
            "id": [
                196
            ],
            "label": [
                1
            ],
            "status": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "HealthIndicatorId": {},
        "AdminPanelHealthServiceStatus": {},
        "SystemHealth": {
            "services": [
                195
            ],
            "__typename": [
                1
            ]
        },
        "FeatureFlag": {
            "key": [
                178
            ],
            "value": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UserInfo": {
            "id": [
                3
            ],
            "email": [
                1
            ],
            "firstName": [
                1
            ],
            "lastName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceInfo": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "allowImpersonation": [
                6
            ],
            "logo": [
                1
            ],
            "totalUsers": [
                11
            ],
            "workspaceUrls": [
                157
            ],
            "users": [
                200
            ],
            "featureFlags": [
                199
            ],
            "__typename": [
                1
            ]
        },
        "UserLookup": {
            "user": [
                200
            ],
            "workspaces": [
                201
            ],
            "__typename": [
                1
            ]
        },
        "VersionInfo": {
            "currentVersion": [
                1
            ],
            "latestVersion": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AdminPanelWorkerQueueHealth": {
            "id": [
                1
            ],
            "queueName": [
                1
            ],
            "status": [
                197
            ],
            "__typename": [
                1
            ]
        },
        "AdminPanelHealthServiceData": {
            "id": [
                196
            ],
            "label": [
                1
            ],
            "description": [
                1
            ],
            "status": [
                197
            ],
            "errorMessage": [
                1
            ],
            "details": [
                1
            ],
            "queues": [
                204
            ],
            "__typename": [
                1
            ]
        },
        "MaintenanceMode": {
            "startAt": [
                4
            ],
            "endAt": [
                4
            ],
            "link": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ModelsDevModelSuggestion": {
            "modelId": [
                1
            ],
            "name": [
                1
            ],
            "inputCostPerMillionTokens": [
                11
            ],
            "outputCostPerMillionTokens": [
                11
            ],
            "cachedInputCostPerMillionTokens": [
                11
            ],
            "cacheCreationCostPerMillionTokens": [
                11
            ],
            "contextWindowTokens": [
                11
            ],
            "maxOutputTokens": [
                11
            ],
            "modalities": [
                1
            ],
            "supportsReasoning": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "ModelsDevProviderSuggestion": {
            "id": [
                1
            ],
            "modelCount": [
                11
            ],
            "npm": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "QueueMetricsDataPoint": {
            "x": [
                11
            ],
            "y": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "QueueMetricsSeries": {
            "id": [
                1
            ],
            "data": [
                209
            ],
            "__typename": [
                1
            ]
        },
        "WorkerQueueMetrics": {
            "failed": [
                11
            ],
            "completed": [
                11
            ],
            "waiting": [
                11
            ],
            "active": [
                11
            ],
            "delayed": [
                11
            ],
            "failureRate": [
                11
            ],
            "failedData": [
                11
            ],
            "completedData": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "QueueMetricsData": {
            "queueName": [
                1
            ],
            "workers": [
                11
            ],
            "timeRange": [
                213
            ],
            "details": [
                211
            ],
            "data": [
                210
            ],
            "__typename": [
                1
            ]
        },
        "QueueMetricsTimeRange": {},
        "VersionDistributionEntry": {
            "version": [
                1
            ],
            "count": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationRegistrationStats": {
            "activeInstalls": [
                21
            ],
            "mostInstalledVersion": [
                1
            ],
            "versionDistribution": [
                214
            ],
            "__typename": [
                1
            ]
        },
        "CreateApplicationRegistration": {
            "applicationRegistration": [
                7
            ],
            "clientSecret": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PublicApplicationRegistration": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "logoUrl": [
                1
            ],
            "websiteUrl": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RotateClientSecret": {
            "clientSecret": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ResendEmailVerificationToken": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "DeleteSso": {
            "identityProviderId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "EditSso": {
            "id": [
                3
            ],
            "type": [
                159
            ],
            "issuer": [
                1
            ],
            "name": [
                1
            ],
            "status": [
                160
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceNameAndId": {
            "displayName": [
                1
            ],
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "FindAvailableSSOIDP": {
            "type": [
                159
            ],
            "id": [
                3
            ],
            "issuer": [
                1
            ],
            "name": [
                1
            ],
            "status": [
                160
            ],
            "workspace": [
                222
            ],
            "__typename": [
                1
            ]
        },
        "SetupSso": {
            "id": [
                3
            ],
            "type": [
                159
            ],
            "issuer": [
                1
            ],
            "name": [
                1
            ],
            "status": [
                160
            ],
            "__typename": [
                1
            ]
        },
        "SSOConnection": {
            "type": [
                159
            ],
            "id": [
                3
            ],
            "issuer": [
                1
            ],
            "name": [
                1
            ],
            "status": [
                160
            ],
            "__typename": [
                1
            ]
        },
        "AvailableWorkspace": {
            "id": [
                3
            ],
            "displayName": [
                1
            ],
            "loginToken": [
                1
            ],
            "personalInviteToken": [
                1
            ],
            "inviteHash": [
                1
            ],
            "workspaceUrls": [
                157
            ],
            "logo": [
                1
            ],
            "sso": [
                225
            ],
            "__typename": [
                1
            ]
        },
        "AvailableWorkspaces": {
            "availableWorkspacesForSignIn": [
                226
            ],
            "availableWorkspacesForSignUp": [
                226
            ],
            "__typename": [
                1
            ]
        },
        "DeletedWorkspaceMember": {
            "id": [
                3
            ],
            "name": [
                19
            ],
            "userEmail": [
                1
            ],
            "avatarUrl": [
                1
            ],
            "userWorkspaceId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "BillingEntitlement": {
            "key": [
                230
            ],
            "value": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BillingEntitlementKey": {},
        "DomainRecord": {
            "validationType": [
                1
            ],
            "type": [
                1
            ],
            "status": [
                1
            ],
            "key": [
                1
            ],
            "value": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DomainValidRecords": {
            "id": [
                3
            ],
            "domain": [
                1
            ],
            "records": [
                231
            ],
            "__typename": [
                1
            ]
        },
        "IndexEdge": {
            "node": [
                36
            ],
            "cursor": [
                39
            ],
            "__typename": [
                1
            ]
        },
        "PageInfo": {
            "hasNextPage": [
                6
            ],
            "hasPreviousPage": [
                6
            ],
            "startCursor": [
                39
            ],
            "endCursor": [
                39
            ],
            "__typename": [
                1
            ]
        },
        "IndexConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                233
            ],
            "__typename": [
                1
            ]
        },
        "IndexFieldEdge": {
            "node": [
                35
            ],
            "cursor": [
                39
            ],
            "__typename": [
                1
            ]
        },
        "IndexIndexFieldMetadatasConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                236
            ],
            "__typename": [
                1
            ]
        },
        "ObjectEdge": {
            "node": [
                45
            ],
            "cursor": [
                39
            ],
            "__typename": [
                1
            ]
        },
        "IndexObjectMetadataConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                238
            ],
            "__typename": [
                1
            ]
        },
        "ObjectRecordCount": {
            "objectNamePlural": [
                1
            ],
            "totalCount": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "ObjectConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                238
            ],
            "__typename": [
                1
            ]
        },
        "ObjectIndexMetadatasConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                233
            ],
            "__typename": [
                1
            ]
        },
        "FieldEdge": {
            "node": [
                33
            ],
            "cursor": [
                39
            ],
            "__typename": [
                1
            ]
        },
        "ObjectFieldsConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                243
            ],
            "__typename": [
                1
            ]
        },
        "UpsertRowLevelPermissionPredicatesResult": {
            "predicates": [
                13
            ],
            "predicateGroups": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "Relation": {
            "type": [
                247
            ],
            "sourceObjectMetadata": [
                45
            ],
            "targetObjectMetadata": [
                45
            ],
            "sourceFieldMetadata": [
                33
            ],
            "targetFieldMetadata": [
                33
            ],
            "__typename": [
                1
            ]
        },
        "RelationType": {},
        "FieldConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                243
            ],
            "__typename": [
                1
            ]
        },
        "AuthToken": {
            "token": [
                1
            ],
            "expiresAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ApplicationTokenPair": {
            "applicationAccessToken": [
                249
            ],
            "applicationRefreshToken": [
                249
            ],
            "__typename": [
                1
            ]
        },
        "FrontComponent": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "sourceComponentPath": [
                1
            ],
            "builtComponentPath": [
                1
            ],
            "componentName": [
                1
            ],
            "builtComponentChecksum": [
                1
            ],
            "universalIdentifier": [
                3
            ],
            "applicationId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "isHeadless": [
                6
            ],
            "usesSdkClient": [
                6
            ],
            "applicationTokenPair": [
                250
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionLogs": {
            "logs": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteTwoFactorAuthenticationMethod": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "InitiateTwoFactorAuthenticationProvisioning": {
            "uri": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "VerifyTwoFactorAuthenticationMethod": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "AuthorizeApp": {
            "redirectUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AuthTokenPair": {
            "accessOrWorkspaceAgnosticToken": [
                249
            ],
            "refreshToken": [
                249
            ],
            "__typename": [
                1
            ]
        },
        "AvailableWorkspacesAndAccessTokens": {
            "tokens": [
                257
            ],
            "availableWorkspaces": [
                227
            ],
            "__typename": [
                1
            ]
        },
        "EmailPasswordResetLink": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "GetAuthorizationUrlForSSO": {
            "authorizationURL": [
                1
            ],
            "type": [
                1
            ],
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "InvalidatePassword": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceUrlsAndId": {
            "workspaceUrls": [
                157
            ],
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "SignUp": {
            "loginToken": [
                249
            ],
            "workspace": [
                262
            ],
            "__typename": [
                1
            ]
        },
        "TransientToken": {
            "transientToken": [
                249
            ],
            "__typename": [
                1
            ]
        },
        "ValidatePasswordResetToken": {
            "id": [
                3
            ],
            "email": [
                1
            ],
            "hasPassword": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "VerifyEmailAndGetLoginToken": {
            "loginToken": [
                249
            ],
            "workspaceUrls": [
                157
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyToken": {
            "token": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AuthTokens": {
            "tokens": [
                257
            ],
            "__typename": [
                1
            ]
        },
        "LoginToken": {
            "loginToken": [
                249
            ],
            "__typename": [
                1
            ]
        },
        "CheckUserExist": {
            "exists": [
                6
            ],
            "availableWorkspacesCount": [
                11
            ],
            "isEmailVerified": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceInviteHashValid": {
            "isValid": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "Impersonate": {
            "loginToken": [
                249
            ],
            "workspace": [
                262
            ],
            "__typename": [
                1
            ]
        },
        "UsageTimeSeries": {
            "date": [
                1
            ],
            "creditsUsed": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "UsageUserDaily": {
            "userWorkspaceId": [
                1
            ],
            "dailyUsage": [
                273
            ],
            "__typename": [
                1
            ]
        },
        "UsageAnalytics": {
            "usageByUser": [
                181
            ],
            "usageByOperationType": [
                181
            ],
            "usageByModel": [
                181
            ],
            "timeSeries": [
                273
            ],
            "periodStart": [
                4
            ],
            "periodEnd": [
                4
            ],
            "userDailyUsage": [
                274
            ],
            "__typename": [
                1
            ]
        },
        "DevelopmentApplication": {
            "id": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMigration": {
            "applicationUniversalIdentifier": [
                1
            ],
            "actions": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "File": {
            "id": [
                3
            ],
            "path": [
                1
            ],
            "size": [
                11
            ],
            "createdAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceApp": {
            "id": [
                1
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "author": [
                1
            ],
            "category": [
                1
            ],
            "logo": [
                1
            ],
            "sourcePackage": [
                1
            ],
            "isFeatured": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "MarketplaceAppDetail": {
            "universalIdentifier": [
                1
            ],
            "id": [
                1
            ],
            "name": [
                1
            ],
            "logoUrl": [
                1
            ],
            "screenshots": [
                1
            ],
            "sourceType": [
                8
            ],
            "sourcePackage": [
                1
            ],
            "latestAvailableVersion": [
                1
            ],
            "isListed": [
                6
            ],
            "isFeatured": [
                6
            ],
            "manifest": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "PublicDomain": {
            "id": [
                3
            ],
            "domain": [
                1
            ],
            "isValidated": [
                6
            ],
            "createdAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "VerificationRecord": {
            "type": [
                1
            ],
            "key": [
                1
            ],
            "value": [
                1
            ],
            "priority": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "EmailingDomain": {
            "id": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "domain": [
                1
            ],
            "driver": [
                284
            ],
            "status": [
                285
            ],
            "verificationRecords": [
                282
            ],
            "verifiedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "EmailingDomainDriver": {},
        "EmailingDomainStatus": {},
        "AutocompleteResult": {
            "text": [
                1
            ],
            "placeId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Location": {
            "lat": [
                11
            ],
            "lng": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "PlaceDetailsResult": {
            "state": [
                1
            ],
            "postcode": [
                1
            ],
            "city": [
                1
            ],
            "country": [
                1
            ],
            "location": [
                287
            ],
            "__typename": [
                1
            ]
        },
        "ConnectionParametersOutput": {
            "host": [
                1
            ],
            "port": [
                11
            ],
            "username": [
                1
            ],
            "password": [
                1
            ],
            "secure": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "ImapSmtpCaldavConnectionParameters": {
            "IMAP": [
                289
            ],
            "SMTP": [
                289
            ],
            "CALDAV": [
                289
            ],
            "__typename": [
                1
            ]
        },
        "ConnectedImapSmtpCaldavAccount": {
            "id": [
                3
            ],
            "handle": [
                1
            ],
            "provider": [
                1
            ],
            "userWorkspaceId": [
                3
            ],
            "connectionParameters": [
                290
            ],
            "__typename": [
                1
            ]
        },
        "ImapSmtpCaldavConnectionSuccess": {
            "success": [
                6
            ],
            "connectedAccountId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "PostgresCredentials": {
            "id": [
                3
            ],
            "user": [
                1
            ],
            "password": [
                1
            ],
            "workspaceId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "CommandMenuItem": {
            "id": [
                3
            ],
            "workflowVersionId": [
                3
            ],
            "frontComponentId": [
                3
            ],
            "frontComponent": [
                251
            ],
            "engineComponentKey": [
                295
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "shortLabel": [
                1
            ],
            "position": [
                11
            ],
            "isPinned": [
                6
            ],
            "availabilityType": [
                296
            ],
            "payload": [
                297
            ],
            "hotKeys": [
                1
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "availabilityObjectMetadataId": [
                3
            ],
            "applicationId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "EngineComponentKey": {},
        "CommandMenuItemAvailabilityType": {},
        "CommandMenuItemPayload": {
            "on_PathCommandMenuItemPayload": [
                298
            ],
            "on_ObjectMetadataCommandMenuItemPayload": [
                299
            ],
            "__typename": [
                1
            ]
        },
        "PathCommandMenuItemPayload": {
            "path": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ObjectMetadataCommandMenuItemPayload": {
            "objectMetadataItemId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "ToolIndexEntry": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "category": [
                1
            ],
            "objectName": [
                1
            ],
            "icon": [
                1
            ],
            "inputSchema": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "AgentMessagePart": {
            "id": [
                3
            ],
            "messageId": [
                3
            ],
            "orderIndex": [
                21
            ],
            "type": [
                1
            ],
            "textContent": [
                1
            ],
            "reasoningContent": [
                1
            ],
            "toolName": [
                1
            ],
            "toolCallId": [
                1
            ],
            "toolInput": [
                15
            ],
            "toolOutput": [
                15
            ],
            "state": [
                1
            ],
            "errorMessage": [
                1
            ],
            "errorDetails": [
                15
            ],
            "sourceUrlSourceId": [
                1
            ],
            "sourceUrlUrl": [
                1
            ],
            "sourceUrlTitle": [
                1
            ],
            "sourceDocumentSourceId": [
                1
            ],
            "sourceDocumentMediaType": [
                1
            ],
            "sourceDocumentTitle": [
                1
            ],
            "sourceDocumentFilename": [
                1
            ],
            "fileMediaType": [
                1
            ],
            "fileFilename": [
                1
            ],
            "fileId": [
                3
            ],
            "fileUrl": [
                1
            ],
            "providerMetadata": [
                15
            ],
            "createdAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "ChannelSyncSuccess": {
            "success": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "BarChartSeries": {
            "key": [
                1
            ],
            "label": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BarChartData": {
            "data": [
                15
            ],
            "indexBy": [
                1
            ],
            "keys": [
                1
            ],
            "series": [
                303
            ],
            "xAxisLabel": [
                1
            ],
            "yAxisLabel": [
                1
            ],
            "showLegend": [
                6
            ],
            "showDataLabels": [
                6
            ],
            "layout": [
                94
            ],
            "groupMode": [
                93
            ],
            "hasTooManyGroups": [
                6
            ],
            "formattedToRawLookup": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "LineChartDataPoint": {
            "x": [
                1
            ],
            "y": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "LineChartSeries": {
            "id": [
                1
            ],
            "label": [
                1
            ],
            "data": [
                305
            ],
            "__typename": [
                1
            ]
        },
        "LineChartData": {
            "series": [
                306
            ],
            "xAxisLabel": [
                1
            ],
            "yAxisLabel": [
                1
            ],
            "showLegend": [
                6
            ],
            "showDataLabels": [
                6
            ],
            "hasTooManyGroups": [
                6
            ],
            "formattedToRawLookup": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "PieChartDataItem": {
            "id": [
                1
            ],
            "value": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "PieChartData": {
            "data": [
                308
            ],
            "showLegend": [
                6
            ],
            "showDataLabels": [
                6
            ],
            "showCenterMetric": [
                6
            ],
            "hasTooManyGroups": [
                6
            ],
            "formattedToRawLookup": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "DuplicatedDashboard": {
            "id": [
                3
            ],
            "title": [
                1
            ],
            "pageLayoutId": [
                3
            ],
            "position": [
                11
            ],
            "createdAt": [
                1
            ],
            "updatedAt": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ConnectedAccountDTO": {
            "id": [
                3
            ],
            "handle": [
                1
            ],
            "provider": [
                1
            ],
            "lastCredentialsRefreshedAt": [
                4
            ],
            "authFailedAt": [
                4
            ],
            "handleAliases": [
                1
            ],
            "scopes": [
                1
            ],
            "connectionParameters": [
                290
            ],
            "lastSignedInAt": [
                4
            ],
            "userWorkspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "PublicConnectionParametersOutput": {
            "host": [
                1
            ],
            "port": [
                11
            ],
            "username": [
                1
            ],
            "secure": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "PublicImapSmtpCaldavConnectionParameters": {
            "IMAP": [
                312
            ],
            "SMTP": [
                312
            ],
            "CALDAV": [
                312
            ],
            "__typename": [
                1
            ]
        },
        "ConnectedAccountPublicDTO": {
            "id": [
                3
            ],
            "handle": [
                1
            ],
            "provider": [
                1
            ],
            "lastCredentialsRefreshedAt": [
                4
            ],
            "authFailedAt": [
                4
            ],
            "handleAliases": [
                1
            ],
            "scopes": [
                1
            ],
            "lastSignedInAt": [
                4
            ],
            "userWorkspaceId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "connectionParameters": [
                313
            ],
            "__typename": [
                1
            ]
        },
        "SendEmailOutput": {
            "success": [
                6
            ],
            "error": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EventLogRecord": {
            "event": [
                1
            ],
            "timestamp": [
                4
            ],
            "userId": [
                1
            ],
            "properties": [
                15
            ],
            "recordId": [
                1
            ],
            "objectMetadataId": [
                1
            ],
            "isCustom": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "EventLogPageInfo": {
            "endCursor": [
                1
            ],
            "hasNextPage": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "EventLogQueryResult": {
            "records": [
                316
            ],
            "totalCount": [
                21
            ],
            "pageInfo": [
                317
            ],
            "__typename": [
                1
            ]
        },
        "Skill": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "description": [
                1
            ],
            "content": [
                1
            ],
            "isCustom": [
                6
            ],
            "isActive": [
                6
            ],
            "applicationId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatThread": {
            "id": [
                3
            ],
            "title": [
                1
            ],
            "totalInputTokens": [
                21
            ],
            "totalOutputTokens": [
                21
            ],
            "contextWindowTokens": [
                21
            ],
            "conversationSize": [
                21
            ],
            "totalInputCredits": [
                11
            ],
            "totalOutputCredits": [
                11
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AgentMessage": {
            "id": [
                3
            ],
            "threadId": [
                3
            ],
            "turnId": [
                3
            ],
            "agentId": [
                3
            ],
            "role": [
                1
            ],
            "status": [
                1
            ],
            "parts": [
                301
            ],
            "processedAt": [
                4
            ],
            "createdAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AISystemPromptSection": {
            "title": [
                1
            ],
            "content": [
                1
            ],
            "estimatedTokenCount": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "AISystemPromptPreview": {
            "sections": [
                322
            ],
            "estimatedTokenCount": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "ChatStreamCatchupChunks": {
            "chunks": [
                15
            ],
            "maxSeq": [
                21
            ],
            "__typename": [
                1
            ]
        },
        "SendChatMessageResult": {
            "messageId": [
                1
            ],
            "queued": [
                6
            ],
            "streamId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatEvent": {
            "threadId": [
                1
            ],
            "event": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatThreadEdge": {
            "node": [
                320
            ],
            "cursor": [
                39
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatThreadConnection": {
            "pageInfo": [
                234
            ],
            "edges": [
                327
            ],
            "__typename": [
                1
            ]
        },
        "AgentTurnEvaluation": {
            "id": [
                3
            ],
            "turnId": [
                3
            ],
            "score": [
                21
            ],
            "comment": [
                1
            ],
            "createdAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AgentTurn": {
            "id": [
                3
            ],
            "threadId": [
                3
            ],
            "agentId": [
                3
            ],
            "evaluations": [
                329
            ],
            "messages": [
                321
            ],
            "createdAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "CalendarChannel": {
            "id": [
                3
            ],
            "handle": [
                1
            ],
            "syncStatus": [
                332
            ],
            "syncStage": [
                333
            ],
            "visibility": [
                334
            ],
            "isContactAutoCreationEnabled": [
                6
            ],
            "contactAutoCreationPolicy": [
                335
            ],
            "isSyncEnabled": [
                6
            ],
            "syncedAt": [
                4
            ],
            "syncStageStartedAt": [
                4
            ],
            "throttleFailureCount": [
                11
            ],
            "connectedAccountId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "CalendarChannelSyncStatus": {},
        "CalendarChannelSyncStage": {},
        "CalendarChannelVisibility": {},
        "CalendarChannelContactAutoCreationPolicy": {},
        "MessageChannel": {
            "id": [
                3
            ],
            "visibility": [
                337
            ],
            "handle": [
                1
            ],
            "type": [
                338
            ],
            "isContactAutoCreationEnabled": [
                6
            ],
            "contactAutoCreationPolicy": [
                339
            ],
            "messageFolderImportPolicy": [
                340
            ],
            "excludeNonProfessionalEmails": [
                6
            ],
            "excludeGroupEmails": [
                6
            ],
            "pendingGroupEmailsAction": [
                341
            ],
            "isSyncEnabled": [
                6
            ],
            "syncedAt": [
                4
            ],
            "syncStatus": [
                342
            ],
            "syncStage": [
                343
            ],
            "syncStageStartedAt": [
                4
            ],
            "throttleFailureCount": [
                11
            ],
            "throttleRetryAfter": [
                4
            ],
            "connectedAccountId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "MessageChannelVisibility": {},
        "MessageChannelType": {},
        "MessageChannelContactAutoCreationPolicy": {},
        "MessageFolderImportPolicy": {},
        "MessageChannelPendingGroupEmailsAction": {},
        "MessageChannelSyncStatus": {},
        "MessageChannelSyncStage": {},
        "MessageFolder": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "isSentFolder": [
                6
            ],
            "isSynced": [
                6
            ],
            "parentFolderId": [
                1
            ],
            "externalId": [
                1
            ],
            "pendingSyncAction": [
                345
            ],
            "messageChannelId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "MessageFolderPendingSyncAction": {},
        "CollectionHash": {
            "collectionName": [
                347
            ],
            "hash": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AllMetadataName": {},
        "MinimalObjectMetadata": {
            "id": [
                3
            ],
            "nameSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "labelPlural": [
                1
            ],
            "icon": [
                1
            ],
            "color": [
                1
            ],
            "isCustom": [
                6
            ],
            "isActive": [
                6
            ],
            "isSystem": [
                6
            ],
            "isRemote": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "MinimalView": {
            "id": [
                3
            ],
            "type": [
                60
            ],
            "key": [
                61
            ],
            "objectMetadataId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "MinimalMetadata": {
            "objectMetadataItems": [
                348
            ],
            "views": [
                349
            ],
            "collectionHashes": [
                346
            ],
            "__typename": [
                1
            ]
        },
        "Webhook": {
            "id": [
                3
            ],
            "targetUrl": [
                1
            ],
            "operations": [
                1
            ],
            "description": [
                1
            ],
            "secret": [
                1
            ],
            "applicationId": [
                3
            ],
            "createdAt": [
                4
            ],
            "updatedAt": [
                4
            ],
            "deletedAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "Query": {
            "navigationMenuItems": [
                145
            ],
            "navigationMenuItem": [
                145,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "getViewFilterGroups": [
                51,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViewFilterGroup": [
                51,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFilters": [
                53,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViewFilter": [
                53,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViews": [
                59,
                {
                    "objectMetadataId": [
                        1
                    ],
                    "viewTypes": [
                        60,
                        "[ViewType!]"
                    ]
                }
            ],
            "getView": [
                59,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewSorts": [
                56,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViewSort": [
                56,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFields": [
                49,
                {
                    "viewId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewField": [
                49,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFieldGroups": [
                58,
                {
                    "viewId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getViewFieldGroup": [
                58,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "apiKeys": [
                2
            ],
            "apiKey": [
                2,
                {
                    "input": [
                        353,
                        "GetApiKeyInput!"
                    ]
                }
            ],
            "enterprisePortalSession": [
                1,
                {
                    "returnUrlPath": [
                        1
                    ]
                }
            ],
            "enterpriseCheckoutSession": [
                1,
                {
                    "billingInterval": [
                        1
                    ]
                }
            ],
            "enterpriseSubscriptionStatus": [
                138
            ],
            "billingPortalSession": [
                135,
                {
                    "returnUrlPath": [
                        1
                    ]
                }
            ],
            "listPlans": [
                134
            ],
            "getMeteredProductsUsage": [
                133
            ],
            "findWorkspaceInvitations": [
                142
            ],
            "getApprovedAccessDomains": [
                140
            ],
            "getPageLayoutTabs": [
                112,
                {
                    "pageLayoutId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayoutTab": [
                112,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayouts": [
                113,
                {
                    "objectMetadataId": [
                        1
                    ],
                    "pageLayoutType": [
                        114
                    ]
                }
            ],
            "getPageLayout": [
                113,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayoutWidgets": [
                74,
                {
                    "pageLayoutTabId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getPageLayoutWidget": [
                74,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findOneLogicFunction": [
                31,
                {
                    "input": [
                        354,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "findManyLogicFunctions": [
                31
            ],
            "getAvailablePackages": [
                15,
                {
                    "input": [
                        354,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "getLogicFunctionSourceCode": [
                1,
                {
                    "input": [
                        354,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "commandMenuItems": [
                294
            ],
            "commandMenuItem": [
                294,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "frontComponents": [
                251
            ],
            "frontComponent": [
                251,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "objectRecordCounts": [
                240
            ],
            "object": [
                45,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "objects": [
                241,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        40,
                        "ObjectFilter!"
                    ]
                }
            ],
            "index": [
                36,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "indexMetadatas": [
                235,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        47,
                        "IndexFilter!"
                    ]
                }
            ],
            "findManyAgents": [
                25
            ],
            "findOneAgent": [
                25,
                {
                    "input": [
                        356,
                        "AgentIdInput!"
                    ]
                }
            ],
            "getRoles": [
                29
            ],
            "getToolIndex": [
                300
            ],
            "getToolInputSchema": [
                15,
                {
                    "toolName": [
                        1,
                        "String!"
                    ]
                }
            ],
            "field": [
                33,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "fields": [
                248,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        46,
                        "FieldFilter!"
                    ]
                }
            ],
            "getViewGroups": [
                55,
                {
                    "viewId": [
                        1
                    ]
                }
            ],
            "getViewGroup": [
                55,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "myMessageFolders": [
                344,
                {
                    "messageChannelId": [
                        3
                    ]
                }
            ],
            "myMessageChannels": [
                336,
                {
                    "connectedAccountId": [
                        3
                    ]
                }
            ],
            "myConnectedAccounts": [
                311
            ],
            "connectedAccountById": [
                314,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "connectedAccounts": [
                311
            ],
            "myCalendarChannels": [
                331,
                {
                    "connectedAccountId": [
                        3
                    ]
                }
            ],
            "webhooks": [
                351
            ],
            "webhook": [
                351,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "minimalMetadata": [
                350
            ],
            "chatThread": [
                320,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "chatMessages": [
                321,
                {
                    "threadId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "chatStreamCatchupChunks": [
                324,
                {
                    "threadId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "getAISystemPromptPreview": [
                323
            ],
            "skills": [
                319
            ],
            "skill": [
                319,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "chatThreads": [
                328,
                {
                    "paging": [
                        38,
                        "CursorPaging!"
                    ],
                    "filter": [
                        357,
                        "AgentChatThreadFilter!"
                    ],
                    "sorting": [
                        360,
                        "[AgentChatThreadSort!]!"
                    ]
                }
            ],
            "agentTurns": [
                330,
                {
                    "agentId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "eventLogs": [
                318,
                {
                    "input": [
                        364,
                        "EventLogQueryInput!"
                    ]
                }
            ],
            "pieChartData": [
                309,
                {
                    "input": [
                        368,
                        "PieChartDataInput!"
                    ]
                }
            ],
            "lineChartData": [
                307,
                {
                    "input": [
                        369,
                        "LineChartDataInput!"
                    ]
                }
            ],
            "barChartData": [
                304,
                {
                    "input": [
                        370,
                        "BarChartDataInput!"
                    ]
                }
            ],
            "checkUserExists": [
                270,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "captchaToken": [
                        1
                    ]
                }
            ],
            "checkWorkspaceInviteHashIsValid": [
                271,
                {
                    "inviteHash": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findWorkspaceFromInviteHash": [
                65,
                {
                    "inviteHash": [
                        1,
                        "String!"
                    ]
                }
            ],
            "validatePasswordResetToken": [
                265,
                {
                    "passwordResetToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findApplicationRegistrationByClientId": [
                217,
                {
                    "clientId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findApplicationRegistrationByUniversalIdentifier": [
                7,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findManyApplicationRegistrations": [
                7
            ],
            "findOneApplicationRegistration": [
                7,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findApplicationRegistrationStats": [
                215,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findApplicationRegistrationVariables": [
                5,
                {
                    "applicationRegistrationId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "applicationRegistrationTarballUrl": [
                1,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "currentUser": [
                68
            ],
            "currentWorkspace": [
                65
            ],
            "getPublicWorkspaceDataByDomain": [
                163,
                {
                    "origin": [
                        1
                    ]
                }
            ],
            "getSSOIdentityProviders": [
                223
            ],
            "getConnectedImapSmtpCaldavAccount": [
                291,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "getAutoCompleteAddress": [
                286,
                {
                    "address": [
                        1,
                        "String!"
                    ],
                    "token": [
                        1,
                        "String!"
                    ],
                    "country": [
                        1
                    ],
                    "isFieldCity": [
                        6
                    ]
                }
            ],
            "getAddressDetails": [
                288,
                {
                    "placeId": [
                        1,
                        "String!"
                    ],
                    "token": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getConfigVariablesGrouped": [
                187
            ],
            "getSystemHealthStatus": [
                198
            ],
            "getIndicatorHealthStatus": [
                205,
                {
                    "indicatorId": [
                        196,
                        "HealthIndicatorId!"
                    ]
                }
            ],
            "getQueueMetrics": [
                212,
                {
                    "queueName": [
                        1,
                        "String!"
                    ],
                    "timeRange": [
                        213
                    ]
                }
            ],
            "versionInfo": [
                203
            ],
            "getAdminAiModels": [
                168
            ],
            "getDatabaseConfigVariable": [
                182,
                {
                    "key": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getQueueJobs": [
                193,
                {
                    "queueName": [
                        1,
                        "String!"
                    ],
                    "state": [
                        191,
                        "JobState!"
                    ],
                    "limit": [
                        21
                    ],
                    "offset": [
                        21
                    ]
                }
            ],
            "findAllApplicationRegistrations": [
                7
            ],
            "getAiProviders": [
                15
            ],
            "getModelsDevProviders": [
                208
            ],
            "getModelsDevSuggestions": [
                207,
                {
                    "providerType": [
                        1,
                        "String!"
                    ]
                }
            ],
            "getAdminAiUsageByWorkspace": [
                181,
                {
                    "periodStart": [
                        4
                    ],
                    "periodEnd": [
                        4
                    ]
                }
            ],
            "getMaintenanceMode": [
                206
            ],
            "getUsageAnalytics": [
                275,
                {
                    "input": [
                        371
                    ]
                }
            ],
            "getPostgresCredentials": [
                293
            ],
            "findManyPublicDomains": [
                281
            ],
            "getEmailingDomains": [
                283
            ],
            "findManyMarketplaceApps": [
                279
            ],
            "findMarketplaceAppDetail": [
                280,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "findManyApplications": [
                48
            ],
            "findOneApplication": [
                48,
                {
                    "id": [
                        3
                    ],
                    "universalIdentifier": [
                        3
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "GetApiKeyInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionIdInput": {
            "id": [
                355
            ],
            "__typename": [
                1
            ]
        },
        "ID": {},
        "AgentIdInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatThreadFilter": {
            "and": [
                357
            ],
            "or": [
                357
            ],
            "id": [
                41
            ],
            "updatedAt": [
                358
            ],
            "__typename": [
                1
            ]
        },
        "DateFieldComparison": {
            "is": [
                6
            ],
            "isNot": [
                6
            ],
            "eq": [
                4
            ],
            "neq": [
                4
            ],
            "gt": [
                4
            ],
            "gte": [
                4
            ],
            "lt": [
                4
            ],
            "lte": [
                4
            ],
            "in": [
                4
            ],
            "notIn": [
                4
            ],
            "between": [
                359
            ],
            "notBetween": [
                359
            ],
            "__typename": [
                1
            ]
        },
        "DateFieldComparisonBetween": {
            "lower": [
                4
            ],
            "upper": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatThreadSort": {
            "field": [
                361
            ],
            "direction": [
                362
            ],
            "nulls": [
                363
            ],
            "__typename": [
                1
            ]
        },
        "AgentChatThreadSortFields": {},
        "SortDirection": {},
        "SortNulls": {},
        "EventLogQueryInput": {
            "table": [
                365
            ],
            "filters": [
                366
            ],
            "first": [
                21
            ],
            "after": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EventLogTable": {},
        "EventLogFiltersInput": {
            "eventType": [
                1
            ],
            "userWorkspaceId": [
                1
            ],
            "dateRange": [
                367
            ],
            "recordId": [
                1
            ],
            "objectMetadataId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EventLogDateRangeInput": {
            "start": [
                4
            ],
            "end": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "PieChartDataInput": {
            "objectMetadataId": [
                3
            ],
            "configuration": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "LineChartDataInput": {
            "objectMetadataId": [
                3
            ],
            "configuration": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "BarChartDataInput": {
            "objectMetadataId": [
                3
            ],
            "configuration": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "UsageAnalyticsInput": {
            "periodStart": [
                4
            ],
            "periodEnd": [
                4
            ],
            "userWorkspaceId": [
                1
            ],
            "operationTypes": [
                372
            ],
            "__typename": [
                1
            ]
        },
        "UsageOperationType": {},
        "Mutation": {
            "addQueryToEventStream": [
                6,
                {
                    "input": [
                        374,
                        "AddQuerySubscriptionInput!"
                    ]
                }
            ],
            "removeQueryFromEventStream": [
                6,
                {
                    "input": [
                        375,
                        "RemoveQueryFromEventStreamInput!"
                    ]
                }
            ],
            "createManyNavigationMenuItems": [
                145,
                {
                    "inputs": [
                        376,
                        "[CreateNavigationMenuItemInput!]!"
                    ]
                }
            ],
            "createNavigationMenuItem": [
                145,
                {
                    "input": [
                        376,
                        "CreateNavigationMenuItemInput!"
                    ]
                }
            ],
            "updateManyNavigationMenuItems": [
                145,
                {
                    "inputs": [
                        377,
                        "[UpdateOneNavigationMenuItemInput!]!"
                    ]
                }
            ],
            "updateNavigationMenuItem": [
                145,
                {
                    "input": [
                        377,
                        "UpdateOneNavigationMenuItemInput!"
                    ]
                }
            ],
            "deleteManyNavigationMenuItems": [
                145,
                {
                    "ids": [
                        3,
                        "[UUID!]!"
                    ]
                }
            ],
            "deleteNavigationMenuItem": [
                145,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "uploadEmailAttachmentFile": [
                141,
                {
                    "file": [
                        379,
                        "Upload!"
                    ]
                }
            ],
            "uploadAIChatFile": [
                141,
                {
                    "file": [
                        379,
                        "Upload!"
                    ]
                }
            ],
            "uploadWorkflowFile": [
                141,
                {
                    "file": [
                        379,
                        "Upload!"
                    ]
                }
            ],
            "uploadWorkspaceLogo": [
                141,
                {
                    "file": [
                        379,
                        "Upload!"
                    ]
                }
            ],
            "uploadWorkspaceMemberProfilePicture": [
                141,
                {
                    "file": [
                        379,
                        "Upload!"
                    ]
                }
            ],
            "uploadFilesFieldFile": [
                141,
                {
                    "file": [
                        379,
                        "Upload!"
                    ],
                    "fieldMetadataId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "uploadFilesFieldFileByUniversalIdentifier": [
                141,
                {
                    "file": [
                        379,
                        "Upload!"
                    ],
                    "fieldMetadataUniversalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createViewFilterGroup": [
                51,
                {
                    "input": [
                        380,
                        "CreateViewFilterGroupInput!"
                    ]
                }
            ],
            "updateViewFilterGroup": [
                51,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        381,
                        "UpdateViewFilterGroupInput!"
                    ]
                }
            ],
            "deleteViewFilterGroup": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyViewFilterGroup": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createViewFilter": [
                53,
                {
                    "input": [
                        382,
                        "CreateViewFilterInput!"
                    ]
                }
            ],
            "updateViewFilter": [
                53,
                {
                    "input": [
                        383,
                        "UpdateViewFilterInput!"
                    ]
                }
            ],
            "deleteViewFilter": [
                53,
                {
                    "input": [
                        385,
                        "DeleteViewFilterInput!"
                    ]
                }
            ],
            "destroyViewFilter": [
                53,
                {
                    "input": [
                        386,
                        "DestroyViewFilterInput!"
                    ]
                }
            ],
            "createView": [
                59,
                {
                    "input": [
                        387,
                        "CreateViewInput!"
                    ]
                }
            ],
            "updateView": [
                59,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        388,
                        "UpdateViewInput!"
                    ]
                }
            ],
            "deleteView": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "destroyView": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createViewSort": [
                56,
                {
                    "input": [
                        389,
                        "CreateViewSortInput!"
                    ]
                }
            ],
            "updateViewSort": [
                56,
                {
                    "input": [
                        390,
                        "UpdateViewSortInput!"
                    ]
                }
            ],
            "deleteViewSort": [
                6,
                {
                    "input": [
                        392,
                        "DeleteViewSortInput!"
                    ]
                }
            ],
            "destroyViewSort": [
                6,
                {
                    "input": [
                        393,
                        "DestroyViewSortInput!"
                    ]
                }
            ],
            "updateViewField": [
                49,
                {
                    "input": [
                        394,
                        "UpdateViewFieldInput!"
                    ]
                }
            ],
            "createViewField": [
                49,
                {
                    "input": [
                        396,
                        "CreateViewFieldInput!"
                    ]
                }
            ],
            "createManyViewFields": [
                49,
                {
                    "inputs": [
                        396,
                        "[CreateViewFieldInput!]!"
                    ]
                }
            ],
            "deleteViewField": [
                49,
                {
                    "input": [
                        397,
                        "DeleteViewFieldInput!"
                    ]
                }
            ],
            "destroyViewField": [
                49,
                {
                    "input": [
                        398,
                        "DestroyViewFieldInput!"
                    ]
                }
            ],
            "updateViewFieldGroup": [
                58,
                {
                    "input": [
                        399,
                        "UpdateViewFieldGroupInput!"
                    ]
                }
            ],
            "createViewFieldGroup": [
                58,
                {
                    "input": [
                        401,
                        "CreateViewFieldGroupInput!"
                    ]
                }
            ],
            "createManyViewFieldGroups": [
                58,
                {
                    "inputs": [
                        401,
                        "[CreateViewFieldGroupInput!]!"
                    ]
                }
            ],
            "deleteViewFieldGroup": [
                58,
                {
                    "input": [
                        402,
                        "DeleteViewFieldGroupInput!"
                    ]
                }
            ],
            "destroyViewFieldGroup": [
                58,
                {
                    "input": [
                        403,
                        "DestroyViewFieldGroupInput!"
                    ]
                }
            ],
            "upsertFieldsWidget": [
                59,
                {
                    "input": [
                        404,
                        "UpsertFieldsWidgetInput!"
                    ]
                }
            ],
            "createApiKey": [
                2,
                {
                    "input": [
                        407,
                        "CreateApiKeyInput!"
                    ]
                }
            ],
            "updateApiKey": [
                2,
                {
                    "input": [
                        408,
                        "UpdateApiKeyInput!"
                    ]
                }
            ],
            "revokeApiKey": [
                2,
                {
                    "input": [
                        409,
                        "RevokeApiKeyInput!"
                    ]
                }
            ],
            "assignRoleToApiKey": [
                6,
                {
                    "apiKeyId": [
                        3,
                        "UUID!"
                    ],
                    "roleId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createObjectEvent": [
                115,
                {
                    "event": [
                        1,
                        "String!"
                    ],
                    "recordId": [
                        3,
                        "UUID!"
                    ],
                    "objectMetadataId": [
                        3,
                        "UUID!"
                    ],
                    "properties": [
                        15
                    ]
                }
            ],
            "trackAnalytics": [
                115,
                {
                    "type": [
                        410,
                        "AnalyticsType!"
                    ],
                    "name": [
                        1
                    ],
                    "event": [
                        1
                    ],
                    "properties": [
                        15
                    ]
                }
            ],
            "refreshEnterpriseValidityToken": [
                6
            ],
            "setEnterpriseKey": [
                137,
                {
                    "enterpriseKey": [
                        1,
                        "String!"
                    ]
                }
            ],
            "skipSyncEmailOnboardingStep": [
                139
            ],
            "skipBookOnboardingStep": [
                139
            ],
            "checkoutSession": [
                135,
                {
                    "recurringInterval": [
                        123,
                        "SubscriptionInterval!"
                    ],
                    "plan": [
                        119,
                        "BillingPlanKey!"
                    ],
                    "requirePaymentMethod": [
                        6,
                        "Boolean!"
                    ],
                    "successUrlPath": [
                        1
                    ]
                }
            ],
            "switchSubscriptionInterval": [
                136
            ],
            "switchBillingPlan": [
                136
            ],
            "cancelSwitchBillingPlan": [
                136
            ],
            "cancelSwitchBillingInterval": [
                136
            ],
            "setMeteredSubscriptionPrice": [
                136,
                {
                    "priceId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "endSubscriptionTrialPeriod": [
                132
            ],
            "cancelSwitchMeteredPrice": [
                136
            ],
            "deleteWorkspaceInvitation": [
                1,
                {
                    "appTokenId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "resendWorkspaceInvitation": [
                143,
                {
                    "appTokenId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "sendInvitations": [
                143,
                {
                    "emails": [
                        1,
                        "[String!]!"
                    ],
                    "roleId": [
                        3
                    ]
                }
            ],
            "createApprovedAccessDomain": [
                140,
                {
                    "input": [
                        411,
                        "CreateApprovedAccessDomainInput!"
                    ]
                }
            ],
            "deleteApprovedAccessDomain": [
                6,
                {
                    "input": [
                        412,
                        "DeleteApprovedAccessDomainInput!"
                    ]
                }
            ],
            "validateApprovedAccessDomain": [
                140,
                {
                    "input": [
                        413,
                        "ValidateApprovedAccessDomainInput!"
                    ]
                }
            ],
            "createPageLayoutTab": [
                112,
                {
                    "input": [
                        414,
                        "CreatePageLayoutTabInput!"
                    ]
                }
            ],
            "updatePageLayoutTab": [
                112,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        415,
                        "UpdatePageLayoutTabInput!"
                    ]
                }
            ],
            "destroyPageLayoutTab": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createPageLayout": [
                113,
                {
                    "input": [
                        416,
                        "CreatePageLayoutInput!"
                    ]
                }
            ],
            "updatePageLayout": [
                113,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        417,
                        "UpdatePageLayoutInput!"
                    ]
                }
            ],
            "destroyPageLayout": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updatePageLayoutWithTabsAndWidgets": [
                113,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        418,
                        "UpdatePageLayoutWithTabsInput!"
                    ]
                }
            ],
            "resetPageLayoutWidgetToDefault": [
                74,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "resetPageLayoutTabToDefault": [
                112,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createPageLayoutWidget": [
                74,
                {
                    "input": [
                        422,
                        "CreatePageLayoutWidgetInput!"
                    ]
                }
            ],
            "updatePageLayoutWidget": [
                74,
                {
                    "id": [
                        1,
                        "String!"
                    ],
                    "input": [
                        423,
                        "UpdatePageLayoutWidgetInput!"
                    ]
                }
            ],
            "destroyPageLayoutWidget": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "deleteOneLogicFunction": [
                31,
                {
                    "input": [
                        354,
                        "LogicFunctionIdInput!"
                    ]
                }
            ],
            "createOneLogicFunction": [
                31,
                {
                    "input": [
                        424,
                        "CreateLogicFunctionFromSourceInput!"
                    ]
                }
            ],
            "executeOneLogicFunction": [
                154,
                {
                    "input": [
                        425,
                        "ExecuteOneLogicFunctionInput!"
                    ]
                }
            ],
            "updateOneLogicFunction": [
                6,
                {
                    "input": [
                        426,
                        "UpdateLogicFunctionFromSourceInput!"
                    ]
                }
            ],
            "createCommandMenuItem": [
                294,
                {
                    "input": [
                        428,
                        "CreateCommandMenuItemInput!"
                    ]
                }
            ],
            "updateCommandMenuItem": [
                294,
                {
                    "input": [
                        429,
                        "UpdateCommandMenuItemInput!"
                    ]
                }
            ],
            "deleteCommandMenuItem": [
                294,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createFrontComponent": [
                251,
                {
                    "input": [
                        430,
                        "CreateFrontComponentInput!"
                    ]
                }
            ],
            "updateFrontComponent": [
                251,
                {
                    "input": [
                        431,
                        "UpdateFrontComponentInput!"
                    ]
                }
            ],
            "deleteFrontComponent": [
                251,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createOneObject": [
                45,
                {
                    "input": [
                        433,
                        "CreateOneObjectInput!"
                    ]
                }
            ],
            "deleteOneObject": [
                45,
                {
                    "input": [
                        435,
                        "DeleteOneObjectInput!"
                    ]
                }
            ],
            "updateOneObject": [
                45,
                {
                    "input": [
                        436,
                        "UpdateOneObjectInput!"
                    ]
                }
            ],
            "createOneAgent": [
                25,
                {
                    "input": [
                        438,
                        "CreateAgentInput!"
                    ]
                }
            ],
            "updateOneAgent": [
                25,
                {
                    "input": [
                        439,
                        "UpdateAgentInput!"
                    ]
                }
            ],
            "deleteOneAgent": [
                25,
                {
                    "input": [
                        356,
                        "AgentIdInput!"
                    ]
                }
            ],
            "updateWorkspaceMemberRole": [
                20,
                {
                    "workspaceMemberId": [
                        3,
                        "UUID!"
                    ],
                    "roleId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createOneRole": [
                29,
                {
                    "createRoleInput": [
                        440,
                        "CreateRoleInput!"
                    ]
                }
            ],
            "updateOneRole": [
                29,
                {
                    "updateRoleInput": [
                        441,
                        "UpdateRoleInput!"
                    ]
                }
            ],
            "deleteOneRole": [
                1,
                {
                    "roleId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "upsertObjectPermissions": [
                16,
                {
                    "upsertObjectPermissionsInput": [
                        443,
                        "UpsertObjectPermissionsInput!"
                    ]
                }
            ],
            "upsertPermissionFlags": [
                27,
                {
                    "upsertPermissionFlagsInput": [
                        445,
                        "UpsertPermissionFlagsInput!"
                    ]
                }
            ],
            "upsertFieldPermissions": [
                26,
                {
                    "upsertFieldPermissionsInput": [
                        446,
                        "UpsertFieldPermissionsInput!"
                    ]
                }
            ],
            "upsertRowLevelPermissionPredicates": [
                245,
                {
                    "input": [
                        448,
                        "UpsertRowLevelPermissionPredicatesInput!"
                    ]
                }
            ],
            "assignRoleToAgent": [
                6,
                {
                    "agentId": [
                        3,
                        "UUID!"
                    ],
                    "roleId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "removeRoleFromAgent": [
                6,
                {
                    "agentId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createOneField": [
                33,
                {
                    "input": [
                        451,
                        "CreateOneFieldMetadataInput!"
                    ]
                }
            ],
            "updateOneField": [
                33,
                {
                    "input": [
                        453,
                        "UpdateOneFieldMetadataInput!"
                    ]
                }
            ],
            "deleteOneField": [
                33,
                {
                    "input": [
                        455,
                        "DeleteOneFieldInput!"
                    ]
                }
            ],
            "createViewGroup": [
                55,
                {
                    "input": [
                        456,
                        "CreateViewGroupInput!"
                    ]
                }
            ],
            "createManyViewGroups": [
                55,
                {
                    "inputs": [
                        456,
                        "[CreateViewGroupInput!]!"
                    ]
                }
            ],
            "updateViewGroup": [
                55,
                {
                    "input": [
                        457,
                        "UpdateViewGroupInput!"
                    ]
                }
            ],
            "updateManyViewGroups": [
                55,
                {
                    "inputs": [
                        457,
                        "[UpdateViewGroupInput!]!"
                    ]
                }
            ],
            "deleteViewGroup": [
                55,
                {
                    "input": [
                        459,
                        "DeleteViewGroupInput!"
                    ]
                }
            ],
            "destroyViewGroup": [
                55,
                {
                    "input": [
                        460,
                        "DestroyViewGroupInput!"
                    ]
                }
            ],
            "updateMessageFolder": [
                344,
                {
                    "input": [
                        461,
                        "UpdateMessageFolderInput!"
                    ]
                }
            ],
            "updateMessageFolders": [
                344,
                {
                    "input": [
                        463,
                        "UpdateMessageFoldersInput!"
                    ]
                }
            ],
            "updateMessageChannel": [
                336,
                {
                    "input": [
                        464,
                        "UpdateMessageChannelInput!"
                    ]
                }
            ],
            "deleteConnectedAccount": [
                311,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "updateCalendarChannel": [
                331,
                {
                    "input": [
                        466,
                        "UpdateCalendarChannelInput!"
                    ]
                }
            ],
            "createWebhook": [
                351,
                {
                    "input": [
                        468,
                        "CreateWebhookInput!"
                    ]
                }
            ],
            "updateWebhook": [
                351,
                {
                    "input": [
                        469,
                        "UpdateWebhookInput!"
                    ]
                }
            ],
            "deleteWebhook": [
                351,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createChatThread": [
                320
            ],
            "sendChatMessage": [
                325,
                {
                    "threadId": [
                        3,
                        "UUID!"
                    ],
                    "text": [
                        1,
                        "String!"
                    ],
                    "messageId": [
                        3,
                        "UUID!"
                    ],
                    "browsingContext": [
                        15
                    ],
                    "modelId": [
                        1
                    ],
                    "fileIds": [
                        3,
                        "[UUID!]"
                    ]
                }
            ],
            "stopAgentChatStream": [
                6,
                {
                    "threadId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "deleteQueuedChatMessage": [
                6,
                {
                    "messageId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createSkill": [
                319,
                {
                    "input": [
                        471,
                        "CreateSkillInput!"
                    ]
                }
            ],
            "updateSkill": [
                319,
                {
                    "input": [
                        472,
                        "UpdateSkillInput!"
                    ]
                }
            ],
            "deleteSkill": [
                319,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "activateSkill": [
                319,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "deactivateSkill": [
                319,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "evaluateAgentTurn": [
                329,
                {
                    "turnId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "runEvaluationInput": [
                330,
                {
                    "agentId": [
                        3,
                        "UUID!"
                    ],
                    "input": [
                        1,
                        "String!"
                    ]
                }
            ],
            "duplicateDashboard": [
                310,
                {
                    "id": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "getAuthorizationUrlForSSO": [
                260,
                {
                    "input": [
                        473,
                        "GetAuthorizationUrlForSSOInput!"
                    ]
                }
            ],
            "getLoginTokenFromCredentials": [
                269,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "captchaToken": [
                        1
                    ],
                    "locale": [
                        1
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "signIn": [
                258,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "captchaToken": [
                        1
                    ],
                    "locale": [
                        1
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "verifyEmailAndGetLoginToken": [
                266,
                {
                    "emailVerificationToken": [
                        1,
                        "String!"
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "captchaToken": [
                        1
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "verifyEmailAndGetWorkspaceAgnosticToken": [
                258,
                {
                    "emailVerificationToken": [
                        1,
                        "String!"
                    ],
                    "email": [
                        1,
                        "String!"
                    ],
                    "captchaToken": [
                        1
                    ]
                }
            ],
            "getAuthTokensFromOTP": [
                268,
                {
                    "otp": [
                        1,
                        "String!"
                    ],
                    "loginToken": [
                        1,
                        "String!"
                    ],
                    "captchaToken": [
                        1
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "signUp": [
                258,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "captchaToken": [
                        1
                    ],
                    "locale": [
                        1
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "signUpInWorkspace": [
                263,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "password": [
                        1,
                        "String!"
                    ],
                    "workspaceId": [
                        3
                    ],
                    "workspaceInviteHash": [
                        1
                    ],
                    "workspacePersonalInviteToken": [
                        1
                    ],
                    "captchaToken": [
                        1
                    ],
                    "locale": [
                        1
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "signUpInNewWorkspace": [
                263
            ],
            "generateTransientToken": [
                264
            ],
            "getAuthTokensFromLoginToken": [
                268,
                {
                    "loginToken": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "authorizeApp": [
                256,
                {
                    "clientId": [
                        1,
                        "String!"
                    ],
                    "codeChallenge": [
                        1
                    ],
                    "redirectUrl": [
                        1,
                        "String!"
                    ],
                    "state": [
                        1
                    ],
                    "scope": [
                        1
                    ]
                }
            ],
            "renewToken": [
                268,
                {
                    "appToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "generateApiKeyToken": [
                267,
                {
                    "apiKeyId": [
                        3,
                        "UUID!"
                    ],
                    "expiresAt": [
                        1,
                        "String!"
                    ]
                }
            ],
            "emailPasswordResetLink": [
                259,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "workspaceId": [
                        3
                    ]
                }
            ],
            "updatePasswordViaResetToken": [
                261,
                {
                    "passwordResetToken": [
                        1,
                        "String!"
                    ],
                    "newPassword": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createApplicationRegistration": [
                216,
                {
                    "input": [
                        474,
                        "CreateApplicationRegistrationInput!"
                    ]
                }
            ],
            "updateApplicationRegistration": [
                7,
                {
                    "input": [
                        475,
                        "UpdateApplicationRegistrationInput!"
                    ]
                }
            ],
            "deleteApplicationRegistration": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "rotateApplicationRegistrationClientSecret": [
                218,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createApplicationRegistrationVariable": [
                5,
                {
                    "input": [
                        477,
                        "CreateApplicationRegistrationVariableInput!"
                    ]
                }
            ],
            "updateApplicationRegistrationVariable": [
                5,
                {
                    "input": [
                        478,
                        "UpdateApplicationRegistrationVariableInput!"
                    ]
                }
            ],
            "deleteApplicationRegistrationVariable": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "uploadAppTarball": [
                7,
                {
                    "file": [
                        379,
                        "Upload!"
                    ],
                    "universalIdentifier": [
                        1
                    ]
                }
            ],
            "transferApplicationRegistrationOwnership": [
                7,
                {
                    "applicationRegistrationId": [
                        1,
                        "String!"
                    ],
                    "targetWorkspaceSubdomain": [
                        1,
                        "String!"
                    ]
                }
            ],
            "initiateOTPProvisioning": [
                254,
                {
                    "loginToken": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "initiateOTPProvisioningForAuthenticatedUser": [
                254
            ],
            "deleteTwoFactorAuthenticationMethod": [
                253,
                {
                    "twoFactorAuthenticationMethodId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "verifyTwoFactorAuthenticationMethodForAuthenticatedUser": [
                255,
                {
                    "otp": [
                        1,
                        "String!"
                    ]
                }
            ],
            "deleteUser": [
                68
            ],
            "deleteUserFromWorkspace": [
                17,
                {
                    "workspaceMemberIdToDelete": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateUserEmail": [
                6,
                {
                    "newEmail": [
                        1,
                        "String!"
                    ],
                    "verifyEmailRedirectPath": [
                        1
                    ]
                }
            ],
            "resendEmailVerificationToken": [
                219,
                {
                    "email": [
                        1,
                        "String!"
                    ],
                    "origin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "activateWorkspace": [
                65,
                {
                    "data": [
                        480,
                        "ActivateWorkspaceInput!"
                    ]
                }
            ],
            "updateWorkspace": [
                65,
                {
                    "data": [
                        481,
                        "UpdateWorkspaceInput!"
                    ]
                }
            ],
            "deleteCurrentWorkspace": [
                65
            ],
            "checkCustomDomainValidRecords": [
                232
            ],
            "createOIDCIdentityProvider": [
                224,
                {
                    "input": [
                        482,
                        "SetupOIDCSsoInput!"
                    ]
                }
            ],
            "createSAMLIdentityProvider": [
                224,
                {
                    "input": [
                        483,
                        "SetupSAMLSsoInput!"
                    ]
                }
            ],
            "deleteSSOIdentityProvider": [
                220,
                {
                    "input": [
                        484,
                        "DeleteSsoInput!"
                    ]
                }
            ],
            "editSSOIdentityProvider": [
                221,
                {
                    "input": [
                        485,
                        "EditSsoInput!"
                    ]
                }
            ],
            "impersonate": [
                272,
                {
                    "userId": [
                        3,
                        "UUID!"
                    ],
                    "workspaceId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "sendEmail": [
                315,
                {
                    "input": [
                        486,
                        "SendEmailInput!"
                    ]
                }
            ],
            "startChannelSync": [
                302,
                {
                    "connectedAccountId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "saveImapSmtpCaldavAccount": [
                292,
                {
                    "accountOwnerId": [
                        3,
                        "UUID!"
                    ],
                    "handle": [
                        1,
                        "String!"
                    ],
                    "connectionParameters": [
                        488,
                        "EmailAccountConnectionParameters!"
                    ],
                    "id": [
                        3
                    ]
                }
            ],
            "updateLabPublicFeatureFlag": [
                199,
                {
                    "input": [
                        490,
                        "UpdateLabPublicFeatureFlagInput!"
                    ]
                }
            ],
            "userLookupAdminPanel": [
                202,
                {
                    "userIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateWorkspaceFeatureFlag": [
                6,
                {
                    "workspaceId": [
                        3,
                        "UUID!"
                    ],
                    "featureFlag": [
                        1,
                        "String!"
                    ],
                    "value": [
                        6,
                        "Boolean!"
                    ]
                }
            ],
            "setAdminAiModelEnabled": [
                6,
                {
                    "modelId": [
                        1,
                        "String!"
                    ],
                    "enabled": [
                        6,
                        "Boolean!"
                    ]
                }
            ],
            "setAdminAiModelsEnabled": [
                6,
                {
                    "modelIds": [
                        1,
                        "[String!]!"
                    ],
                    "enabled": [
                        6,
                        "Boolean!"
                    ]
                }
            ],
            "setAdminAiModelRecommended": [
                6,
                {
                    "modelId": [
                        1,
                        "String!"
                    ],
                    "recommended": [
                        6,
                        "Boolean!"
                    ]
                }
            ],
            "setAdminAiModelsRecommended": [
                6,
                {
                    "modelIds": [
                        1,
                        "[String!]!"
                    ],
                    "recommended": [
                        6,
                        "Boolean!"
                    ]
                }
            ],
            "setAdminDefaultAiModel": [
                6,
                {
                    "role": [
                        491,
                        "AiModelRole!"
                    ],
                    "modelId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createDatabaseConfigVariable": [
                6,
                {
                    "key": [
                        1,
                        "String!"
                    ],
                    "value": [
                        15,
                        "JSON!"
                    ]
                }
            ],
            "updateDatabaseConfigVariable": [
                6,
                {
                    "key": [
                        1,
                        "String!"
                    ],
                    "value": [
                        15,
                        "JSON!"
                    ]
                }
            ],
            "deleteDatabaseConfigVariable": [
                6,
                {
                    "key": [
                        1,
                        "String!"
                    ]
                }
            ],
            "retryJobs": [
                194,
                {
                    "queueName": [
                        1,
                        "String!"
                    ],
                    "jobIds": [
                        1,
                        "[String!]!"
                    ]
                }
            ],
            "deleteJobs": [
                189,
                {
                    "queueName": [
                        1,
                        "String!"
                    ],
                    "jobIds": [
                        1,
                        "[String!]!"
                    ]
                }
            ],
            "addAiProvider": [
                6,
                {
                    "providerName": [
                        1,
                        "String!"
                    ],
                    "providerConfig": [
                        15,
                        "JSON!"
                    ]
                }
            ],
            "removeAiProvider": [
                6,
                {
                    "providerName": [
                        1,
                        "String!"
                    ]
                }
            ],
            "addModelToProvider": [
                6,
                {
                    "providerName": [
                        1,
                        "String!"
                    ],
                    "modelConfig": [
                        15,
                        "JSON!"
                    ]
                }
            ],
            "removeModelFromProvider": [
                6,
                {
                    "providerName": [
                        1,
                        "String!"
                    ],
                    "modelName": [
                        1,
                        "String!"
                    ]
                }
            ],
            "setMaintenanceMode": [
                6,
                {
                    "startAt": [
                        4,
                        "DateTime!"
                    ],
                    "endAt": [
                        4,
                        "DateTime!"
                    ],
                    "link": [
                        1
                    ]
                }
            ],
            "clearMaintenanceMode": [
                6
            ],
            "enablePostgresProxy": [
                293
            ],
            "disablePostgresProxy": [
                293
            ],
            "createPublicDomain": [
                281,
                {
                    "domain": [
                        1,
                        "String!"
                    ]
                }
            ],
            "deletePublicDomain": [
                6,
                {
                    "domain": [
                        1,
                        "String!"
                    ]
                }
            ],
            "checkPublicDomainValidRecords": [
                232,
                {
                    "domain": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createEmailingDomain": [
                283,
                {
                    "domain": [
                        1,
                        "String!"
                    ],
                    "driver": [
                        284,
                        "EmailingDomainDriver!"
                    ]
                }
            ],
            "deleteEmailingDomain": [
                6,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "verifyEmailingDomain": [
                283,
                {
                    "id": [
                        1,
                        "String!"
                    ]
                }
            ],
            "createOneAppToken": [
                67,
                {
                    "input": [
                        492,
                        "CreateOneAppTokenInput!"
                    ]
                }
            ],
            "installMarketplaceApp": [
                6,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ],
                    "version": [
                        1
                    ]
                }
            ],
            "syncMarketplaceCatalog": [
                6
            ],
            "installApplication": [
                6,
                {
                    "appRegistrationId": [
                        1,
                        "String!"
                    ],
                    "version": [
                        1
                    ]
                }
            ],
            "runWorkspaceMigration": [
                6,
                {
                    "workspaceMigration": [
                        494,
                        "WorkspaceMigrationInput!"
                    ]
                }
            ],
            "uninstallApplication": [
                6,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ]
                }
            ],
            "updateOneApplicationVariable": [
                6,
                {
                    "key": [
                        1,
                        "String!"
                    ],
                    "value": [
                        1,
                        "String!"
                    ],
                    "applicationId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "createDevelopmentApplication": [
                276,
                {
                    "universalIdentifier": [
                        1,
                        "String!"
                    ],
                    "name": [
                        1,
                        "String!"
                    ]
                }
            ],
            "generateApplicationToken": [
                250,
                {
                    "applicationId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "syncApplication": [
                277,
                {
                    "manifest": [
                        15,
                        "JSON!"
                    ]
                }
            ],
            "uploadApplicationFile": [
                278,
                {
                    "file": [
                        379,
                        "Upload!"
                    ],
                    "applicationUniversalIdentifier": [
                        1,
                        "String!"
                    ],
                    "fileFolder": [
                        497,
                        "FileFolder!"
                    ],
                    "filePath": [
                        1,
                        "String!"
                    ]
                }
            ],
            "upgradeApplication": [
                6,
                {
                    "appRegistrationId": [
                        1,
                        "String!"
                    ],
                    "targetVersion": [
                        1,
                        "String!"
                    ]
                }
            ],
            "renewApplicationToken": [
                250,
                {
                    "applicationRefreshToken": [
                        1,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "AddQuerySubscriptionInput": {
            "eventStreamId": [
                1
            ],
            "queryId": [
                1
            ],
            "operationSignature": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "RemoveQueryFromEventStreamInput": {
            "eventStreamId": [
                1
            ],
            "queryId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateNavigationMenuItemInput": {
            "id": [
                3
            ],
            "userWorkspaceId": [
                3
            ],
            "targetRecordId": [
                3
            ],
            "targetObjectMetadataId": [
                3
            ],
            "viewId": [
                3
            ],
            "type": [
                146
            ],
            "name": [
                1
            ],
            "link": [
                1
            ],
            "icon": [
                1
            ],
            "color": [
                1
            ],
            "folderId": [
                3
            ],
            "position": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "UpdateOneNavigationMenuItemInput": {
            "id": [
                3
            ],
            "update": [
                378
            ],
            "__typename": [
                1
            ]
        },
        "UpdateNavigationMenuItemInput": {
            "folderId": [
                3
            ],
            "position": [
                11
            ],
            "name": [
                1
            ],
            "link": [
                1
            ],
            "icon": [
                1
            ],
            "color": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Upload": {},
        "CreateViewFilterGroupInput": {
            "id": [
                3
            ],
            "parentViewFilterGroupId": [
                3
            ],
            "logicalOperator": [
                52
            ],
            "positionInViewFilterGroup": [
                11
            ],
            "viewId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFilterGroupInput": {
            "id": [
                3
            ],
            "parentViewFilterGroupId": [
                3
            ],
            "logicalOperator": [
                52
            ],
            "positionInViewFilterGroup": [
                11
            ],
            "viewId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewFilterInput": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "operand": [
                54
            ],
            "value": [
                15
            ],
            "viewFilterGroupId": [
                3
            ],
            "positionInViewFilterGroup": [
                11
            ],
            "subFieldName": [
                1
            ],
            "viewId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFilterInput": {
            "id": [
                3
            ],
            "update": [
                384
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFilterInputUpdates": {
            "fieldMetadataId": [
                3
            ],
            "operand": [
                54
            ],
            "value": [
                15
            ],
            "viewFilterGroupId": [
                3
            ],
            "positionInViewFilterGroup": [
                11
            ],
            "subFieldName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewFilterInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewFilterInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "objectMetadataId": [
                3
            ],
            "type": [
                60
            ],
            "key": [
                61
            ],
            "icon": [
                1
            ],
            "position": [
                11
            ],
            "isCompact": [
                6
            ],
            "shouldHideEmptyGroups": [
                6
            ],
            "openRecordIn": [
                62
            ],
            "kanbanAggregateOperation": [
                50
            ],
            "kanbanAggregateOperationFieldMetadataId": [
                3
            ],
            "anyFieldFilterValue": [
                1
            ],
            "calendarLayout": [
                63
            ],
            "calendarFieldMetadataId": [
                3
            ],
            "mainGroupByFieldMetadataId": [
                3
            ],
            "visibility": [
                64
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "type": [
                60
            ],
            "icon": [
                1
            ],
            "position": [
                11
            ],
            "isCompact": [
                6
            ],
            "openRecordIn": [
                62
            ],
            "kanbanAggregateOperation": [
                50
            ],
            "kanbanAggregateOperationFieldMetadataId": [
                3
            ],
            "anyFieldFilterValue": [
                1
            ],
            "calendarLayout": [
                63
            ],
            "calendarFieldMetadataId": [
                3
            ],
            "visibility": [
                64
            ],
            "mainGroupByFieldMetadataId": [
                3
            ],
            "shouldHideEmptyGroups": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewSortInput": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "direction": [
                57
            ],
            "viewId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewSortInput": {
            "id": [
                3
            ],
            "update": [
                391
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewSortInputUpdates": {
            "direction": [
                57
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewSortInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewSortInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldInput": {
            "id": [
                3
            ],
            "update": [
                395
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldInputUpdates": {
            "isVisible": [
                6
            ],
            "size": [
                11
            ],
            "position": [
                11
            ],
            "aggregateOperation": [
                50
            ],
            "viewFieldGroupId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewFieldInput": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "viewId": [
                3
            ],
            "isVisible": [
                6
            ],
            "size": [
                11
            ],
            "position": [
                11
            ],
            "aggregateOperation": [
                50
            ],
            "viewFieldGroupId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewFieldInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewFieldInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldGroupInput": {
            "id": [
                3
            ],
            "update": [
                400
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewFieldGroupInputUpdates": {
            "name": [
                1
            ],
            "position": [
                11
            ],
            "isVisible": [
                6
            ],
            "deletedAt": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewFieldGroupInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "viewId": [
                3
            ],
            "position": [
                11
            ],
            "isVisible": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewFieldGroupInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewFieldGroupInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpsertFieldsWidgetInput": {
            "widgetId": [
                3
            ],
            "groups": [
                405
            ],
            "fields": [
                406
            ],
            "__typename": [
                1
            ]
        },
        "UpsertFieldsWidgetGroupInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "position": [
                11
            ],
            "isVisible": [
                6
            ],
            "fields": [
                406
            ],
            "__typename": [
                1
            ]
        },
        "UpsertFieldsWidgetFieldInput": {
            "viewFieldId": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "isVisible": [
                6
            ],
            "position": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "CreateApiKeyInput": {
            "name": [
                1
            ],
            "expiresAt": [
                1
            ],
            "revokedAt": [
                1
            ],
            "roleId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApiKeyInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "expiresAt": [
                1
            ],
            "revokedAt": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RevokeApiKeyInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "AnalyticsType": {},
        "CreateApprovedAccessDomainInput": {
            "domain": [
                1
            ],
            "email": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteApprovedAccessDomainInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "ValidateApprovedAccessDomainInput": {
            "validationToken": [
                1
            ],
            "approvedAccessDomainId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "CreatePageLayoutTabInput": {
            "title": [
                1
            ],
            "position": [
                11
            ],
            "pageLayoutId": [
                3
            ],
            "layoutMode": [
                78
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutTabInput": {
            "title": [
                1
            ],
            "position": [
                11
            ],
            "icon": [
                1
            ],
            "layoutMode": [
                78
            ],
            "__typename": [
                1
            ]
        },
        "CreatePageLayoutInput": {
            "name": [
                1
            ],
            "type": [
                114
            ],
            "objectMetadataId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutInput": {
            "name": [
                1
            ],
            "type": [
                114
            ],
            "objectMetadataId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutWithTabsInput": {
            "name": [
                1
            ],
            "type": [
                114
            ],
            "objectMetadataId": [
                3
            ],
            "tabs": [
                419
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutTabWithWidgetsInput": {
            "id": [
                3
            ],
            "title": [
                1
            ],
            "position": [
                11
            ],
            "icon": [
                1
            ],
            "layoutMode": [
                78
            ],
            "widgets": [
                420
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutWidgetWithIdInput": {
            "id": [
                3
            ],
            "pageLayoutTabId": [
                3
            ],
            "title": [
                1
            ],
            "type": [
                75
            ],
            "objectMetadataId": [
                3
            ],
            "gridPosition": [
                421
            ],
            "position": [
                15
            ],
            "configuration": [
                15
            ],
            "conditionalDisplay": [
                15
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "GridPositionInput": {
            "row": [
                11
            ],
            "column": [
                11
            ],
            "rowSpan": [
                11
            ],
            "columnSpan": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "CreatePageLayoutWidgetInput": {
            "pageLayoutTabId": [
                3
            ],
            "title": [
                1
            ],
            "type": [
                75
            ],
            "objectMetadataId": [
                3
            ],
            "gridPosition": [
                421
            ],
            "position": [
                15
            ],
            "configuration": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "UpdatePageLayoutWidgetInput": {
            "pageLayoutTabId": [
                3
            ],
            "title": [
                1
            ],
            "type": [
                75
            ],
            "objectMetadataId": [
                3
            ],
            "gridPosition": [
                421
            ],
            "position": [
                15
            ],
            "configuration": [
                15
            ],
            "conditionalDisplay": [
                15
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateLogicFunctionFromSourceInput": {
            "id": [
                3
            ],
            "universalIdentifier": [
                3
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "timeoutSeconds": [
                11
            ],
            "toolInputSchema": [
                15
            ],
            "isTool": [
                6
            ],
            "source": [
                15
            ],
            "cronTriggerSettings": [
                15
            ],
            "databaseEventTriggerSettings": [
                15
            ],
            "httpRouteTriggerSettings": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "ExecuteOneLogicFunctionInput": {
            "id": [
                3
            ],
            "payload": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "UpdateLogicFunctionFromSourceInput": {
            "id": [
                3
            ],
            "update": [
                427
            ],
            "__typename": [
                1
            ]
        },
        "UpdateLogicFunctionFromSourceInputUpdates": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "timeoutSeconds": [
                11
            ],
            "sourceHandlerCode": [
                1
            ],
            "toolInputSchema": [
                15
            ],
            "handlerName": [
                1
            ],
            "sourceHandlerPath": [
                1
            ],
            "isTool": [
                6
            ],
            "cronTriggerSettings": [
                15
            ],
            "databaseEventTriggerSettings": [
                15
            ],
            "httpRouteTriggerSettings": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "CreateCommandMenuItemInput": {
            "workflowVersionId": [
                3
            ],
            "frontComponentId": [
                3
            ],
            "engineComponentKey": [
                295
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "shortLabel": [
                1
            ],
            "position": [
                11
            ],
            "isPinned": [
                6
            ],
            "availabilityType": [
                296
            ],
            "hotKeys": [
                1
            ],
            "conditionalAvailabilityExpression": [
                1
            ],
            "availabilityObjectMetadataId": [
                3
            ],
            "payload": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "UpdateCommandMenuItemInput": {
            "id": [
                3
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "shortLabel": [
                1
            ],
            "position": [
                11
            ],
            "isPinned": [
                6
            ],
            "availabilityType": [
                296
            ],
            "availabilityObjectMetadataId": [
                3
            ],
            "engineComponentKey": [
                295
            ],
            "hotKeys": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateFrontComponentInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "description": [
                1
            ],
            "sourceComponentPath": [
                1
            ],
            "builtComponentPath": [
                1
            ],
            "componentName": [
                1
            ],
            "builtComponentChecksum": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateFrontComponentInput": {
            "id": [
                3
            ],
            "update": [
                432
            ],
            "__typename": [
                1
            ]
        },
        "UpdateFrontComponentInputUpdates": {
            "name": [
                1
            ],
            "description": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateOneObjectInput": {
            "object": [
                434
            ],
            "__typename": [
                1
            ]
        },
        "CreateObjectInput": {
            "nameSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "labelSingular": [
                1
            ],
            "labelPlural": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "shortcut": [
                1
            ],
            "color": [
                1
            ],
            "skipNameField": [
                6
            ],
            "isRemote": [
                6
            ],
            "primaryKeyColumnType": [
                1
            ],
            "primaryKeyFieldMetadataSettings": [
                15
            ],
            "isLabelSyncedWithName": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "DeleteOneObjectInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateOneObjectInput": {
            "update": [
                437
            ],
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateObjectPayload": {
            "labelSingular": [
                1
            ],
            "labelPlural": [
                1
            ],
            "nameSingular": [
                1
            ],
            "namePlural": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "shortcut": [
                1
            ],
            "color": [
                1
            ],
            "isActive": [
                6
            ],
            "labelIdentifierFieldMetadataId": [
                3
            ],
            "imageIdentifierFieldMetadataId": [
                3
            ],
            "isLabelSyncedWithName": [
                6
            ],
            "isSearchable": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "CreateAgentInput": {
            "name": [
                1
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "description": [
                1
            ],
            "prompt": [
                1
            ],
            "modelId": [
                1
            ],
            "roleId": [
                3
            ],
            "responseFormat": [
                15
            ],
            "modelConfiguration": [
                15
            ],
            "evaluationInputs": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateAgentInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "description": [
                1
            ],
            "prompt": [
                1
            ],
            "modelId": [
                1
            ],
            "roleId": [
                3
            ],
            "responseFormat": [
                15
            ],
            "modelConfiguration": [
                15
            ],
            "evaluationInputs": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateRoleInput": {
            "id": [
                1
            ],
            "label": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "canUpdateAllSettings": [
                6
            ],
            "canAccessAllTools": [
                6
            ],
            "canReadAllObjectRecords": [
                6
            ],
            "canUpdateAllObjectRecords": [
                6
            ],
            "canSoftDeleteAllObjectRecords": [
                6
            ],
            "canDestroyAllObjectRecords": [
                6
            ],
            "canBeAssignedToUsers": [
                6
            ],
            "canBeAssignedToAgents": [
                6
            ],
            "canBeAssignedToApiKeys": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateRoleInput": {
            "update": [
                442
            ],
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateRolePayload": {
            "label": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "canUpdateAllSettings": [
                6
            ],
            "canAccessAllTools": [
                6
            ],
            "canReadAllObjectRecords": [
                6
            ],
            "canUpdateAllObjectRecords": [
                6
            ],
            "canSoftDeleteAllObjectRecords": [
                6
            ],
            "canDestroyAllObjectRecords": [
                6
            ],
            "canBeAssignedToUsers": [
                6
            ],
            "canBeAssignedToAgents": [
                6
            ],
            "canBeAssignedToApiKeys": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpsertObjectPermissionsInput": {
            "roleId": [
                3
            ],
            "objectPermissions": [
                444
            ],
            "__typename": [
                1
            ]
        },
        "ObjectPermissionInput": {
            "objectMetadataId": [
                3
            ],
            "canReadObjectRecords": [
                6
            ],
            "canUpdateObjectRecords": [
                6
            ],
            "canSoftDeleteObjectRecords": [
                6
            ],
            "canDestroyObjectRecords": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpsertPermissionFlagsInput": {
            "roleId": [
                3
            ],
            "permissionFlagKeys": [
                18
            ],
            "__typename": [
                1
            ]
        },
        "UpsertFieldPermissionsInput": {
            "roleId": [
                3
            ],
            "fieldPermissions": [
                447
            ],
            "__typename": [
                1
            ]
        },
        "FieldPermissionInput": {
            "objectMetadataId": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "canReadFieldValue": [
                6
            ],
            "canUpdateFieldValue": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpsertRowLevelPermissionPredicatesInput": {
            "roleId": [
                3
            ],
            "objectMetadataId": [
                3
            ],
            "predicates": [
                449
            ],
            "predicateGroups": [
                450
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateInput": {
            "id": [
                3
            ],
            "fieldMetadataId": [
                3
            ],
            "operand": [
                14
            ],
            "value": [
                15
            ],
            "subFieldName": [
                1
            ],
            "workspaceMemberFieldMetadataId": [
                1
            ],
            "workspaceMemberSubFieldName": [
                1
            ],
            "rowLevelPermissionPredicateGroupId": [
                3
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "RowLevelPermissionPredicateGroupInput": {
            "id": [
                3
            ],
            "objectMetadataId": [
                3
            ],
            "parentRowLevelPermissionPredicateGroupId": [
                3
            ],
            "logicalOperator": [
                12
            ],
            "positionInRowLevelPermissionPredicateGroup": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "CreateOneFieldMetadataInput": {
            "field": [
                452
            ],
            "__typename": [
                1
            ]
        },
        "CreateFieldInput": {
            "type": [
                34
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "isCustom": [
                6
            ],
            "isActive": [
                6
            ],
            "isSystem": [
                6
            ],
            "isUIReadOnly": [
                6
            ],
            "isNullable": [
                6
            ],
            "isUnique": [
                6
            ],
            "defaultValue": [
                15
            ],
            "options": [
                15
            ],
            "settings": [
                15
            ],
            "objectMetadataId": [
                3
            ],
            "isLabelSyncedWithName": [
                6
            ],
            "isRemoteCreation": [
                6
            ],
            "relationCreationPayload": [
                15
            ],
            "morphRelationsCreationPayload": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "UpdateOneFieldMetadataInput": {
            "id": [
                3
            ],
            "update": [
                454
            ],
            "__typename": [
                1
            ]
        },
        "UpdateFieldInput": {
            "universalIdentifier": [
                1
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "description": [
                1
            ],
            "icon": [
                1
            ],
            "isActive": [
                6
            ],
            "isSystem": [
                6
            ],
            "isUIReadOnly": [
                6
            ],
            "isNullable": [
                6
            ],
            "isUnique": [
                6
            ],
            "defaultValue": [
                15
            ],
            "options": [
                15
            ],
            "settings": [
                15
            ],
            "objectMetadataId": [
                3
            ],
            "isLabelSyncedWithName": [
                6
            ],
            "morphRelationsUpdatePayload": [
                15
            ],
            "__typename": [
                1
            ]
        },
        "DeleteOneFieldInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "CreateViewGroupInput": {
            "id": [
                3
            ],
            "isVisible": [
                6
            ],
            "fieldValue": [
                1
            ],
            "position": [
                11
            ],
            "viewId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewGroupInput": {
            "id": [
                3
            ],
            "update": [
                458
            ],
            "__typename": [
                1
            ]
        },
        "UpdateViewGroupInputUpdates": {
            "fieldMetadataId": [
                3
            ],
            "isVisible": [
                6
            ],
            "fieldValue": [
                1
            ],
            "position": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "DeleteViewGroupInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "DestroyViewGroupInput": {
            "id": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageFolderInput": {
            "id": [
                3
            ],
            "update": [
                462
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageFolderInputUpdates": {
            "isSynced": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageFoldersInput": {
            "ids": [
                3
            ],
            "update": [
                462
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageChannelInput": {
            "id": [
                3
            ],
            "update": [
                465
            ],
            "__typename": [
                1
            ]
        },
        "UpdateMessageChannelInputUpdates": {
            "visibility": [
                337
            ],
            "isContactAutoCreationEnabled": [
                6
            ],
            "contactAutoCreationPolicy": [
                339
            ],
            "messageFolderImportPolicy": [
                340
            ],
            "isSyncEnabled": [
                6
            ],
            "excludeNonProfessionalEmails": [
                6
            ],
            "excludeGroupEmails": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateCalendarChannelInput": {
            "id": [
                3
            ],
            "update": [
                467
            ],
            "__typename": [
                1
            ]
        },
        "UpdateCalendarChannelInputUpdates": {
            "visibility": [
                334
            ],
            "isContactAutoCreationEnabled": [
                6
            ],
            "contactAutoCreationPolicy": [
                335
            ],
            "isSyncEnabled": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "CreateWebhookInput": {
            "id": [
                3
            ],
            "targetUrl": [
                1
            ],
            "operations": [
                1
            ],
            "description": [
                1
            ],
            "secret": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWebhookInput": {
            "id": [
                3
            ],
            "update": [
                470
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWebhookInputUpdates": {
            "targetUrl": [
                1
            ],
            "operations": [
                1
            ],
            "description": [
                1
            ],
            "secret": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateSkillInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "description": [
                1
            ],
            "content": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateSkillInput": {
            "id": [
                3
            ],
            "name": [
                1
            ],
            "label": [
                1
            ],
            "icon": [
                1
            ],
            "description": [
                1
            ],
            "content": [
                1
            ],
            "isActive": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "GetAuthorizationUrlForSSOInput": {
            "identityProviderId": [
                3
            ],
            "workspaceInviteHash": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateApplicationRegistrationInput": {
            "name": [
                1
            ],
            "universalIdentifier": [
                1
            ],
            "oAuthRedirectUris": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationInput": {
            "id": [
                1
            ],
            "update": [
                476
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationPayload": {
            "name": [
                1
            ],
            "oAuthRedirectUris": [
                1
            ],
            "oAuthScopes": [
                1
            ],
            "isListed": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "CreateApplicationRegistrationVariableInput": {
            "applicationRegistrationId": [
                1
            ],
            "key": [
                1
            ],
            "value": [
                1
            ],
            "description": [
                1
            ],
            "isSecret": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationVariableInput": {
            "id": [
                1
            ],
            "update": [
                479
            ],
            "__typename": [
                1
            ]
        },
        "UpdateApplicationRegistrationVariablePayload": {
            "value": [
                1
            ],
            "description": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ActivateWorkspaceInput": {
            "displayName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateWorkspaceInput": {
            "subdomain": [
                1
            ],
            "customDomain": [
                1
            ],
            "displayName": [
                1
            ],
            "logo": [
                1
            ],
            "inviteHash": [
                1
            ],
            "isPublicInviteLinkEnabled": [
                6
            ],
            "allowImpersonation": [
                6
            ],
            "isGoogleAuthEnabled": [
                6
            ],
            "isMicrosoftAuthEnabled": [
                6
            ],
            "isPasswordAuthEnabled": [
                6
            ],
            "isGoogleAuthBypassEnabled": [
                6
            ],
            "isMicrosoftAuthBypassEnabled": [
                6
            ],
            "isPasswordAuthBypassEnabled": [
                6
            ],
            "defaultRoleId": [
                3
            ],
            "isTwoFactorAuthenticationEnforced": [
                6
            ],
            "trashRetentionDays": [
                11
            ],
            "eventLogRetentionDays": [
                11
            ],
            "fastModel": [
                1
            ],
            "smartModel": [
                1
            ],
            "aiAdditionalInstructions": [
                1
            ],
            "editableProfileFields": [
                1
            ],
            "enabledAiModelIds": [
                1
            ],
            "useRecommendedModels": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "SetupOIDCSsoInput": {
            "name": [
                1
            ],
            "issuer": [
                1
            ],
            "clientID": [
                1
            ],
            "clientSecret": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SetupSAMLSsoInput": {
            "name": [
                1
            ],
            "issuer": [
                1
            ],
            "id": [
                3
            ],
            "ssoURL": [
                1
            ],
            "certificate": [
                1
            ],
            "fingerprint": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteSsoInput": {
            "identityProviderId": [
                3
            ],
            "__typename": [
                1
            ]
        },
        "EditSsoInput": {
            "id": [
                3
            ],
            "status": [
                160
            ],
            "__typename": [
                1
            ]
        },
        "SendEmailInput": {
            "connectedAccountId": [
                1
            ],
            "to": [
                1
            ],
            "cc": [
                1
            ],
            "bcc": [
                1
            ],
            "subject": [
                1
            ],
            "body": [
                1
            ],
            "inReplyTo": [
                1
            ],
            "files": [
                487
            ],
            "__typename": [
                1
            ]
        },
        "SendEmailAttachmentInput": {
            "id": [
                1
            ],
            "name": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EmailAccountConnectionParameters": {
            "IMAP": [
                489
            ],
            "SMTP": [
                489
            ],
            "CALDAV": [
                489
            ],
            "__typename": [
                1
            ]
        },
        "ConnectionParameters": {
            "host": [
                1
            ],
            "port": [
                11
            ],
            "username": [
                1
            ],
            "password": [
                1
            ],
            "secure": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "UpdateLabPublicFeatureFlagInput": {
            "publicFeatureFlag": [
                1
            ],
            "value": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "AiModelRole": {},
        "CreateOneAppTokenInput": {
            "appToken": [
                493
            ],
            "__typename": [
                1
            ]
        },
        "CreateAppTokenInput": {
            "expiresAt": [
                4
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMigrationInput": {
            "actions": [
                495
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMigrationDeleteActionInput": {
            "type": [
                496
            ],
            "metadataName": [
                347
            ],
            "universalIdentifier": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "WorkspaceMigrationActionType": {},
        "FileFolder": {},
        "Subscription": {
            "onEventSubscription": [
                153,
                {
                    "eventStreamId": [
                        1,
                        "String!"
                    ]
                }
            ],
            "logicFunctionLogs": [
                252,
                {
                    "input": [
                        499,
                        "LogicFunctionLogsInput!"
                    ]
                }
            ],
            "onAgentChatEvent": [
                326,
                {
                    "threadId": [
                        3,
                        "UUID!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        },
        "LogicFunctionLogsInput": {
            "applicationId": [
                3
            ],
            "applicationUniversalIdentifier": [
                3
            ],
            "name": [
                1
            ],
            "id": [
                3
            ],
            "universalIdentifier": [
                3
            ],
            "__typename": [
                1
            ]
        }
    }
}