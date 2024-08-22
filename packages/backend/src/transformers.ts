import {
    TeamTransformer,
    UserTransformer,
    defaultUserTransformer,
  } from '@backstage/plugin-catalog-backend-module-github';
  
  // This team transformer completely replaces the built in logic with custom logic.
  export const myTeamTransformer: TeamTransformer = async team => {
    return {
      apiVersion: 'backstage.io/v1alpha1',
      kind: 'Group',
      metadata: {
        name: team.slug,
        annotations: {},
      },
      spec: {
        type: 'GitHub Org Team',
        profile: {},
        children: [],
      },
    };
  };
  
export const myVerifiedUserTransformer: UserTransformer = async (user, ctx) => {
    const backstageUser = await defaultUserTransformer(user, ctx);
    if (backstageUser && user.organizationVerifiedDomainEmails?.length) {
      backstageUser.spec.profile!.email =
        user.organizationVerifiedDomainEmails[0];
    }
    return backstageUser;
  };