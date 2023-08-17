import { ApiClient } from "./api-client";
import {
    AssetResponse, DepositAddressResponse, Web3PagedResponse, NCW
} from "./types";
import { NcwSdk } from "./ncw-sdk";

export class NcwApiClient implements NcwSdk {
    constructor(private readonly apiClient: ApiClient) {
    }

    public async createWallet(): Promise<{ walletId: string; enabled: boolean; }> {
        return await this.apiClient.issuePostRequest(
            `/v1/wallets`,
            {});
    }

    public async getWallet(walletId: string): Promise<{ walletId: string; enabled: boolean; }> {
        return await this.apiClient.issueGetRequest(
            `/v1/wallets/${walletId}`);
    }

    public async enableWallet(walletId: string, enabled: boolean): Promise<void> {
        return await this.apiClient.issuePutRequest(
            `/v1/wallets/${walletId}/enable`,
            { enabled });
    }

    public async invokeWalletRpc(walletId: string, deviceId: string, payload: string): Promise<{ result: string; } | { error: { message: string; code?: number; }; }> {
        return await this.apiClient.issuePostRequest(
            `/v1/wallets/${walletId}/devices/${deviceId}/invoke`,
            { payload });
    }

    public async createWalletAccount(walletId: string): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issuePostRequest(
            `/v1/wallets/${walletId}/accounts`,
            {});
    }

    public async getWallets({ pageCursor, pageSize, sort, order }: NCW.GetWalletsPayload = {}): Promise<Web3PagedResponse<NCW.WalletInfo>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(`/v1/wallets?${params.toString()}`);
    }

    public async getWalletAccounts(walletId: string, { pageCursor, pageSize, sort, order }: NCW.GetWalletsPayload = {}): Promise<Web3PagedResponse<{
        walletId: string;
        accountId: number;
    }>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `/v1/wallets/${walletId}/accounts?${params.toString()}`);
    }

    public async getWalletAccount(walletId: string, accountId: number): Promise<{
        walletId: string;
        accountId: number;
    }> {
        return await this.apiClient.issueGetRequest(
            `/v1/wallets/${walletId}/accounts/${accountId}`);
    }

    public async getWalletAssets(walletId: string, accountId: number, { pageCursor, pageSize, sort, order }: NCW.GetWalletAssetsPayload = {}): Promise<Web3PagedResponse<NCW.WalletAssetResponse>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `/v1/wallets/${walletId}/accounts/${accountId}/assets?${params.toString()}`);
    }

    public async getWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetResponse> {
        return await this.apiClient.issueGetRequest(
            `/v1/wallets/${walletId}/accounts/${accountId}/assets/${assetId}`);
    }

    public async activateWalletAsset(walletId: string, accountId: number, assetId: string): Promise<NCW.WalletAssetAddress> {
        return await this.apiClient.issuePostRequest(
            `/v1/wallets/${walletId}/accounts/${accountId}/assets/${assetId}`, {});
    }

    public async getWalletAssetAddresses(walletId: string, accountId: number, assetId: string, { pageCursor, pageSize, sort, order }: NCW.GetWalletAddressesPayload = {}): Promise<Web3PagedResponse<NCW.WalletAssetAddress>> {
        const params = new URLSearchParams({
            ...(pageCursor && { pageCursor }),
            ...(pageSize && { pageSize: pageSize.toString() }),
            ...(sort && { sort }),
            ...(order && { order }),
        });

        return await this.apiClient.issueGetRequest(
            `/v1/wallets/${walletId}/accounts/${accountId}/assets/${assetId}/addresses?${params.toString()}`);
    }

    public async getWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issueGetRequest(
            `/v1/wallets/${walletId}/accounts/${accountId}/assets/${assetId}/balance`);
    }

    public async refreshWalletAssetBalance(walletId: string, accountId: number, assetId: string): Promise<AssetResponse> {
        return await this.apiClient.issuePutRequest(
            `/v1/wallets/${walletId}/accounts/${accountId}/assets/${assetId}/balance`,
            {});
    }
}
