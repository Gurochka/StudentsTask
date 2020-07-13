import { ResourcesService } from '../services';

const resourcesService = new ResourcesService();

export class ResourcesCtrl {
    async getResources (req, res) {
        const resources = await resourcesService.getResources();
        res.send(resources);
    }
}
