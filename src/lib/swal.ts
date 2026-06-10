import Swal from 'sweetalert2';

export const customSwal = Swal.mixin({
  buttonsStyling: false,
  iconColor: '#C8A96E',
  customClass: {
    popup: '!rounded-[20px] !bg-white !text-[#111] !p-8 !shadow-[0_8px_28px_rgba(0,0,0,0.12)] !border !border-[#E8E8E8]',
    title: '!font-serif !text-[2rem] !font-normal !text-[#111]',
    htmlContainer: '!font-sans !text-[0.9375rem] !text-[#6B6B6B] !mt-2',
    confirmButton: '!bg-[#111] !text-white !font-sans !text-[0.875rem] !font-medium !rounded-full !py-3 !px-8 !transition-all hover:!bg-[#C8A96E] hover:-translate-y-[2px] hover:!shadow-[0_8px_24px_rgba(200,169,110,0.35)] !tracking-wide !border-0 !mx-2',
    cancelButton: '!bg-transparent !text-[#111] !border-[1.5px] !border-[#E8E8E8] !font-sans !text-[0.875rem] !font-medium !rounded-full !py-3 !px-8 !transition-all hover:!border-[#111] hover:-translate-y-[2px] !mx-2',
    icon: '!border-[#C8A96E] !text-[#C8A96E]'
  }
});

export default customSwal;
