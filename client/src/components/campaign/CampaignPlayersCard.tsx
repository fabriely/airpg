import { useEffect, useState } from "react";
import api from "services/api";

interface Player {
    character_name: string;
    character_class: string;
    player_id: string;
    is_player: boolean;
}

interface Campaign {
    name: string;
    description: string;
    players: Player[];
}

const PlayerCard = ({ player }: { player: Player }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{player.character_name}</h3>
            <p className="text-sm text-gray-600">{player.character_class}</p>
        </div>
    );
};

const PlayerList = ({ code }: { code: string }) => {
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaignData = async () => {
            try {
                const response = await api.get(`/campaign/${code}`);
                setCampaign(response.data.data.campaign);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar a campanha:", error);
                setLoading(false);
            }
        };

        fetchCampaignData();
    }, [code]);

    if (loading) return <p>Carregando jogadores...</p>;
    if (!campaign) return <p>Campanha não encontrada.</p>;

    return (
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
            {campaign.players.filter(player => player.is_player).map((player) => (
                <PlayerCard key={player.player_id} player={player} />
            ))}
        </div>
    );
};

export default PlayerList;
