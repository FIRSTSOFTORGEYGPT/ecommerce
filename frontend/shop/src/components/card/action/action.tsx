import { useUI } from "@contexts/ui.context";
import { useDefaultPaymentMethod } from '@framework/card';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import PopOver from '@components/ui/popover';

interface ActionProps {
  card: any;
  payments: string[];
}

const Action = ({ card = {}, payments = [] }: ActionProps) => {
  const { t } = useTranslation('common');
  const { openModal, setModalData, setModalView } = useUI();
  const { createDefaultPaymentMethod, isLoading: cardLoading } =
    useDefaultPaymentMethod();

  function deleteCard(id: string) {
    setModalData({
      card_id: id,
    });
    setModalView("DELETE_CARD_MODAL");
    return openModal();
  }

  const makeDefaultCard = async (id: string) => {
    await createDefaultPaymentMethod({
      method_id: id,
    });
  };

  return (
    <>
      {!card?.default_card ? (
        <PopOver>
          <Button
            className="!h-auto w-full !justify-start px-2 !py-1 text-sm leading-6 hover:bg-gray-50 hover:text-accent focus:!shadow-none focus:!ring-0"
            onClick={() => makeDefaultCard(card?.id)}
            variant="custom"
            disabled={cardLoading}
          >
            {t('text-set-as-default')}
          </Button>

          <Button
            variant="custom"
            onClick={() => deleteCard(card?.id)}
            className="!h-auto w-full !justify-start px-2 !py-1 text-sm leading-6 text-[#F83D3D] hover:bg-gray-50 hover:text-[#d03131] focus:!shadow-none focus:!ring-0"
          >
            {t('text-delete')}
          </Button>
        </PopOver>
      ) : (
        ''
      )}
      {payments?.length <= 1 ? (
        <PopOver>
          <Button
            variant="custom"
            onClick={() => deleteCard(card?.id)}
            className="!h-auto w-full !justify-start px-2 !py-1 text-sm leading-6 text-[#F83D3D] hover:bg-gray-50 hover:text-[#d03131] focus:!shadow-none focus:!ring-0"
          >
            {t('text-delete')}
          </Button>
        </PopOver>
      ) : (
        ''
      )}
    </>
  );
};

export default Action;
