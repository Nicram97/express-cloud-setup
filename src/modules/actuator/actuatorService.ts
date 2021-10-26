
/**
 *
        Endpoints
    ID 	        Description
    info 	    Displays application information.
    metrics 	Shows metrics information for the current application.
    health 	    Shows application health information.
 */
export const actuatorOptions = {
    basePath: '/actuator',
    infoGitMode: 'simple',
    infoBuildOptions: null,
    infoDateFormat: null,
    customEndpoints: []
};